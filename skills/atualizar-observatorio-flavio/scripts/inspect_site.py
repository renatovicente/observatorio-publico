#!/usr/bin/env python3
"""Inventário PT/EN do Observatório Público. Somente leitura; sem rede ou execução de módulos."""
import argparse
from collections import Counter
from datetime import date
from html import unescape
import json
from pathlib import Path
import re
import sys

DEFAULT_PROJECT = Path.cwd()
EXPECTED_ID = 'appgprj_6ae0ebb57ec48191a0f9b863a72218c2'
MONTHS = dict(zip('janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro'.split(), range(1, 13)))
EN_MONTHS = dict(zip('january february march april may june july august september october november december'.split(), range(1, 13)))
CATEGORIES_EN = {'Criminal': 'Criminal', 'Eleitoral': 'Electoral', 'Cível': 'Civil', 'Parlamentar': 'Parliamentary'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('checkout', nargs='?', type=Path, default=DEFAULT_PROJECT)
    args = parser.parse_args()
    root = args.checkout.resolve()
    errors, warnings = [], []
    try:
        manifest_path = root / '.openai/hosting.json'
        manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
        by_person = {
            'flavio': json.loads((root / 'dist/data.json').read_text()),
            'lula': json.loads((root / 'dist/data.lula.json').read_text()),
        }
        records = [record for items in by_person.values() for record in items]
        for person, items in by_person.items():
            if any(r['id'].startswith('lula-') != (person == 'lula') for r in items):
                errors.append(f'Fichas misturadas no dossiê {person}.')
        if any(r['state'] == 'pedido' for r in by_person['lula']):
            errors.append('Lula: pedido sem instauração confirmada fora do recorte.')
        if not isinstance(manifest, dict):
            raise ValueError('O manifesto precisa ser um objeto.')
        if not isinstance(records, list) or not all(isinstance(r, dict) for r in records):
            raise ValueError('data.json precisa conter uma lista de objetos.')
        ids = [r['id'] for r in records]
        if not all(isinstance(i, str) and i for i in ids):
            raise ValueError('Há ficha sem ID válido.')
        dates = [date.fromisoformat(r['updated']).isoformat() for r in records]
        source_urls = {s['url'] for r in records for s in r['sources']}
    except (OSError, ValueError, TypeError, KeyError) as exc:
        print(json.dumps({'project': str(root), 'errors': [str(exc)]}, ensure_ascii=False, indent=2))
        return 1
    if manifest_path.exists() and manifest.get('project_id') != EXPECTED_ID:
        errors.append('Manifesto de outro site; confirmar identidade antes de publicar.')
    duplicates = [key for key, count in Counter(ids).items() if count > 1]
    if duplicates:
        errors.append(f'IDs repetidos: {duplicates}')

    bilingual = {'routes': {'pt': '/', 'en': '/en/'}, 'english_records': None,
                 'source_hashes': None, 'hash_freshness': 'Não verificada; executar node build-data.mjs.'}
    try:
        english = json.loads((root / 'dist/data.en.json').read_text()) + json.loads((root / 'dist/data.lula.en.json').read_text())
        hashes = {**json.loads((root / 'translations/en-source-hashes.json').read_text()), **json.loads((root / 'translations/lula-en-source-hashes.json').read_text())}
        if not isinstance(english, list) or not all(isinstance(r, dict) for r in english):
            raise ValueError('data.en.json precisa conter uma lista de objetos.')
        english_ids = [r['id'] for r in english]
        if not all(isinstance(i, str) and i for i in english_ids):
            raise ValueError('Há ficha inglesa sem ID válido.')
        if len(set(english_ids)) != len(english_ids):
            errors.append('IDs repetidos na versão inglesa.')
        if set(english_ids) != set(ids):
            errors.append('Conjuntos de fichas diferentes entre português e inglês.')
        if not isinstance(hashes, dict) or not all(isinstance(v, str) and re.fullmatch(r'[0-9a-f]{64}', v) for v in hashes.values()):
            raise ValueError('Arquivo de hashes de tradução inválido.')
        if set(hashes) != set(ids):
            errors.append('Cobertura de IDs dos hashes diferente do acervo português.')
        originals = {r['id']: r for r in records}
        mismatches = []

        def source_metadata(record):
            return [{k: v for k, v in source.items() if k not in ('title', 'note')} for source in record['sources']]

        for translated in english:
            original = originals.get(translated['id'])
            if original is None:
                continue
            fields = [key for key in ('state', 'updated') if translated.get(key) != original.get(key)]
            if translated.get('category') != CATEGORIES_EN.get(original.get('category')):
                fields.append('category')
            if re.findall(r'\d+', translated.get('identifier', '')) != re.findall(r'\d+', original.get('identifier', '')):
                fields.append('identifier')
            if [e['date'] for e in translated['events']] != [e['date'] for e in original['events']]:
                fields.append('events.date')
            if source_metadata(translated) != source_metadata(original):
                fields.append('sources.metadata')
            if fields:
                mismatches.append({'id': original['id'], 'fields': fields})
        bilingual.update({'english_records': len(english), 'source_hashes': len(hashes),
                          'factual_metadata_mismatches': mismatches})
        if mismatches:
            errors.append('Metadados factuais divergentes entre idiomas; consulte factual_metadata_mismatches.')
    except (OSError, ValueError, TypeError, KeyError, AttributeError) as exc:
        errors.append(f'Inventário bilíngue: {exc}')

    required = ('dist/en/index.html', 'translations/en.mjs', 'build-locales.mjs', 'dist/severity.mjs', 'dist/lula-severity.mjs', 'dist/dossiers.mjs', 'dist/case-status.mjs', 'records/lula.mjs', 'translations/lula.en.mjs')
    bilingual['supporting_files'] = {relative: (root / relative).is_file() for relative in required}
    for relative, present in bilingual['supporting_files'].items():
        if not present:
            errors.append(f'Arquivo necessário ausente: {relative}.')
    severity = {'module_present': (root / 'dist/severity.mjs').is_file(),
                'coverage_and_order_checked': False,
                'verification_command': 'node validate.mjs',
                'note': 'A inspeção não executa o módulo nem infere suas classificações por regex.'}

    metadata, files = {}, {}
    for relative in ('dist/index.html', 'dist/en/index.html', 'dist/app.js', 'dist/dossiers.mjs', 'validate.mjs', 'README.md'):
        try:
            files[relative] = (root / relative).read_text()
        except OSError:
            warnings.append(f'Arquivo não disponível: {relative}.')

    def capture(label, file, pattern, convert=lambda x: x):
        match = re.search(pattern, files.get(file, ''), re.I | re.S)
        if not match:
            warnings.append(f'Marcador não encontrado: {label}; conferir estrutura atual.')
            return
        try:
            value = convert(unescape(match.group(1)).strip())
            date.fromisoformat(value)
            metadata[label] = value
        except (ValueError, KeyError):
            warnings.append(f'Data não reconhecida: {label}.')

    def pt_date(value):
        day, month, year = value.lower().split(' de ')
        return date(int(year), MONTHS[month], int(day)).isoformat()

    def numeric_date(value):
        day, month, year = re.split(r'[/.]', value)
        return date(int(year), int(month), int(day)).isoformat()

    def en_date(value):
        day, month, year = value.lower().split()
        return date(int(year), EN_MONTHS[month], int(day)).isoformat()

    capture('hero', 'dist/index.html', r'Pesquisa concluída em\s*(?:<br>\s*)?<strong>([^<]+)</strong>', pt_date)
    capture('methodology', 'dist/index.html', r'web até (\d{2}/\d{2}/\d{4})', numeric_date)
    capture('footer', 'dist/index.html', r'Edição de (\d{2}\.\d{2}\.\d{4})', numeric_date)
    capture('hero_en', 'dist/en/index.html', r'Research completed on\s*(?:<br>\s*)?<strong>([^<]+)</strong>', en_date)
    capture('methodology_en', 'dist/en/index.html', r'found online through (\d{1,2} [a-z]+ \d{4})', en_date)
    capture('footer_en', 'dist/en/index.html', r'Edition of (\d{1,2} [a-z]+ \d{4})', en_date)
    for person in by_person:
        capture('export_' + person, 'dist/dossiers.mjs', person + r"\s*:\s*\{.*?researchedAt\s*:\s*['\"](\d{4}-\d{2}-\d{2})['\"]")
    capture('validator_cutoff', 'validate.mjs', r'''obj\.date\s*<=\s*['"](\d{4}-\d{2}-\d{2})['"]''')
    capture('readme', 'README.md', r'encerrada em (\d{2}/\d{2}/\d{4})', numeric_date)
    if len(set(metadata.values())) > 1:
        warnings.append('Datas de metadados divergentes; verificar se há revisão parcial identificada.')
    latest = max(dates, default=None)
    cutoff = metadata.get('validator_cutoff')
    if latest and cutoff and latest > cutoff:
        errors.append('Há ficha posterior ao limite fixado no validador.')
    historical_tokens = ('data.find(', 'data.filter(', 'english.find(', 'english.filter(', 'ordered.', 'compareCaseSeverity(')
    assertions = [line.strip() for line in files.get('validate.mjs', '').splitlines() if 'assert.' in line and any(token in line for token in historical_tokens)]
    report = {
        'project': str(root), 'project_id': manifest.get('project_id'),
        'records': len(records), 'unique_sources': len(source_urls),
        'dossiers': {person: {'records': len(items), 'unique_sources': len({source['url'] for record in items for source in record['sources']})} for person, items in by_person.items()},
        'categories': dict(Counter(r.get('category', '(ausente)') for r in records)),
        'states': dict(Counter(r.get('state', '(ausente)') for r in records)),
        'latest_record_date': latest, 'edition_metadata': metadata,
        'bilingual': bilingual, 'severity': severity,
        'fixed_editorial_assertions': assertions,
        'follow_up_candidates': [{'id': r.get('id'), 'updated': r.get('updated'), 'role': r.get('role'), 'status': r.get('status')} for r in records if r.get('state') in ('investigacao', 'pedido') or 'não confirm' in str(r.get('limit', '')).lower() or 'não foi confirm' in str(r.get('limit', '')).lower()],
        'warnings': warnings, 'errors': errors,
        'scope': 'Inspeção local. Não verifica fatos, semântica das traduções, atualidade dos hashes, critérios/ordem de gravidade, disponibilidade de URLs ou publicação. Não substitui o build, validate.mjs ou revisão editorial.'
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
