export const dossiers = {
  flavio: {
    name: 'Flávio Bolsonaro', heading: 'Flávio<br><em>Bolsonaro.</em>',
    files: {pt:'data.json',en:'data.en.json'}, researchedAt:'2026-10-27',
    description: {
      pt:'Processos e investigações contra Flávio Bolsonaro em andamento ou com sanção vigente na última informação localizada.',
      en:'Cases and investigations against Flávio Bolsonaro that are ongoing or have a standing sanction in the latest information located.'
    },
    scope: {
      pt:'Somente procedimentos contra Flávio Bolsonaro em andamento ou com condenação ou sanção sem encerramento documentado. Casos encerrados, arquivados, anulados, prescritos, absolvidos, julgados improcedentes e pedidos sem abertura confirmada não são exibidos. A situação é a da última fonte localizada; fichas não equivalem a número de crimes.',
      en:'Only proceedings against Flávio Bolsonaro that are ongoing or have a judgment or sanction without documented closure. Closed, archived, annulled, time-barred, acquitted or dismissed cases and requests without a confirmed opening are not displayed. Status reflects the latest source located; records are not a count of crimes.'
    }
  },
  lula: {
    name:'Luiz Inácio Lula da Silva', heading:'<em>Lula.</em>',
    files:{pt:'data.lula.json',en:'data.lula.en.json'}, researchedAt:'2026-10-27',
    description:{
      pt:'Processos e investigações contra o próprio Lula em andamento ou com sanção vigente na última informação localizada.',
      en:'Proceedings and investigations against Lula himself that are ongoing or have a standing sanction in the latest information located.'
    },
    scope:{
      pt:'Somente processos e investigações efetivamente instaurados contra Luiz Inácio Lula da Silva. Não inclui casos de parentes ou aliados, menções incidentais nem pedidos de apuração sem instauração confirmada. Só exibe casos em andamento ou com condenação/sanção sem encerramento documentado; oculta encerrados, arquivados, anulados, prescritos, absolvidos e julgados improcedentes. A situação é a da última fonte localizada. Fichas não equivalem a número de crimes.',
      en:'Only proceedings and investigations actually instituted against Luiz Inácio Lula da Silva. Cases involving relatives or allies, incidental mentions and requests for inquiries without a confirmed opening are excluded. Only ongoing cases or judgments/sanctions without documented closure are displayed; closed, archived, annulled, time-barred, acquitted or dismissed cases are hidden. Status reflects the latest source located. Records are not a count of crimes.'
    }
  }
};

export function readRoute(url) {
  let caseId = null;
  if (url.hash.startsWith('#caso=')) {
    try { caseId = decodeURIComponent(url.hash.slice(6)); } catch { /* Invalid links fall back to the archive. */ }
  }
  const requested = url.searchParams.get('pessoa');
  // Historical case links work without a person parameter, including Flávio's calunia-lula record.
  const person = caseId ? (caseId.startsWith('lula-') ? 'lula' : 'flavio') : (requested === 'lula' ? 'lula' : 'flavio');
  return {person,caseId};
}

export function personUrl(url, person, hash='') {
  const next = new URL(url);
  if (person === 'lula') next.searchParams.set('pessoa','lula');
  else next.searchParams.delete('pessoa');
  next.hash = hash;
  return next;
}
