import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {severityBands,recordSeverity,severityFor,compareCaseSeverity} from './dist/severity.mjs';
const data=JSON.parse(readFileSync(new URL('./dist/data.json',import.meta.url)));
assert.equal(new Set(data.map(r=>r.id)).size,data.length,'IDs duplicados');
for(const r of data){
  for(const key of ['id','title','category','court','state','status','role','updated','summary','details','defense','limit'])assert.ok(typeof r[key]==='string'&&r[key].length>0,`${r.id}: ${key} ausente`);
  assert.ok(/^[a-z0-9-]+$/.test(r.id));
  assert.ok(['Criminal','Eleitoral','Cível','Parlamentar'].includes(r.category));
  assert.ok(['investigacao','decisao','encerrado','pedido'].includes(r.state));
  assert.ok(/^(Investigado|Denunciado|Réu|Representado|Alvo)\b/u.test(r.role),`${r.id}: papel fora do recorte contra Flávio`);
  assert.ok(r.sources.length&&r.events.length);
  for(const obj of [...r.sources,...r.events,{date:r.updated}]){
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(obj.date),`${r.id}: data inválida`);
    assert.ok(obj.date<='2026-10-27',`${r.id}: data posterior à pesquisa`);
    assert.ok(!Number.isNaN(Date.parse(obj.date)));
  }
  for(const s of r.sources){assert.equal(new URL(s.url).protocol,'https:');assert.ok(s.publisher&&s.title);}
  assert.ok(r.events.every(e=>e.date<=r.updated),`${r.id}: histórico posterior ao registro`);
}
assert.equal(data.find(r=>r.id==='rachadinhas-alerj').state,'encerrado');
assert.equal(data.find(r=>r.id==='chico-buarque').status,'Condenação reformada em recurso');
assert.ok(data.filter(r=>r.id.startsWith('etica-pce')).every(r=>r.state==='pedido'));
console.log(`Validado: ${data.length} fichas, ${new Set(data.flatMap(r=>r.sources.map(s=>s.url))).size} fontes únicas.`);
const english=JSON.parse(readFileSync(new URL('./dist/data.en.json',import.meta.url)));
assert.deepEqual(english.map(r=>r.id),data.map(r=>r.id),'Fichas divergentes entre idiomas');
const categories={Criminal:'Criminal',Eleitoral:'Electoral','Cível':'Civil',Parlamentar:'Parliamentary'};
for(const [i,translated] of english.entries()){
  const original=data[i];
  for(const key of ['state','updated'])assert.equal(translated[key],original[key],`${original.id}: ${key} divergente entre idiomas`);
  assert.equal(translated.category,categories[original.category]);
  for(const key of ['title','court','status','role','summary','details','defense','limit'])assert.ok(typeof translated[key]==='string'&&translated[key].trim(),`${original.id}: tradução incompleta de ${key}`);
  assert.deepEqual(translated.events.map(e=>e.date),original.events.map(e=>e.date),'Datas dos eventos alteradas na tradução');
  assert.deepEqual(translated.sources.map(({title,note,...metadata})=>metadata),original.sources.map(({title,note,...metadata})=>metadata),'Referências alteradas na tradução');
  assert.deepEqual((translated.identifier||'').match(/\d+/g),(original.identifier||'').match(/\d+/g),'Número processual alterado na tradução');
  assert.ok(translated.events.every(e=>e.title&&e.text));
  assert.ok(translated.sources.every(s=>s.title));
}
assert.equal(english.find(r=>r.id==='rachadinhas-alerj').status,'Criminal complaint rejected in 2022');
assert.equal(english.find(r=>r.id==='chico-buarque').status,'Civil judgment reversed on appeal');
assert.ok(english.filter(r=>r.id.startsWith('etica-pce')).every(r=>r.status==='Petition; admission not confirmed'));
console.log(`Validado: paridade dos ${english.length} registros em inglês, fontes, cronologia e decisões favoráveis preservadas.`);
assert.deepEqual(Object.keys(recordSeverity).sort(),data.map(r=>r.id).sort(),'Classificação editorial deve cobrir exatamente o acervo');
assert.equal(new Set(severityBands.map(b=>b.rank)).size,severityBands.length);
for(const record of data){
  const severity=severityFor(record);
  assert.ok(severity&&severity.rank>=1&&severity.rank<=5,`${record.id}: faixa editorial inválida`);
  for(const language of ['pt','en'])assert.ok(severity.label[language]&&severity.description[language]&&severity.reason[language],`${record.id}: critério sem tradução`);
}
const ordered=[...data].sort(compareCaseSeverity);
assert.deepEqual(ordered.map(r=>r.id),[...english].sort(compareCaseSeverity).map(r=>r.id),'Ordem de gravidade deve ser idêntica nos dois idiomas');
assert.deepEqual(new Set(ordered.slice(0,3).map(r=>r.id)),new Set(['rachadinhas-alerj','dark-horse','willer-tomaz']));
assert.equal(ordered.at(-1).id,'furna-acareacao');
// Closing a case does not rewrite the impact of its subject or imply guilt.
assert.ok(compareCaseSeverity(data.find(r=>r.id==='rachadinhas-alerj'),data.find(r=>r.id==='santini-contas'))<0);
// Same-band ties follow date, then stable ID, rather than language or prosecution status.
assert.ok(compareCaseSeverity({id:'dark-horse',updated:'2026-10-26'},{id:'willer-tomaz',updated:'2026-10-25'})<0);
assert.ok(compareCaseSeverity({id:'dark-horse',updated:'2026-10-26'},{id:'willer-tomaz',updated:'2026-10-26'})<0);
console.log('Validado: gravidade editorial, cobertura bilíngue e desempates por data e ID.');
