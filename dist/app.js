'use strict';
import {severityBands,severityFor,compareCaseSeverity} from './severity.mjs';
import {dossiers,readRoute,personUrl} from './dossiers.mjs';
import {caseDisposition,countedCases} from './case-status.mjs';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const isEnglish = document.documentElement.lang === 'en';
const tr = (pt,en) => isEnglish ? en : pt;
const locale = isEnglish ? 'en-GB' : 'pt-BR';
const date = s => new Date(s+'T12:00:00').toLocaleDateString(locale,isEnglish?{day:'2-digit',month:'short',year:'numeric'}:undefined);
const state = {view:'cases',category:'all',status:'all',query:'',sorts:{cases:'severity',timeline:'recent',sources:'recent'}};
const categories = isEnglish ? ['Criminal','Electoral','Civil','Parliamentary'] : ['Criminal','Eleitoral','Cível','Parlamentar'];
let records = [], currentCase = null, person = readRoute(new URL(location.href)).person;
const archives = new Map();
let loading = true;
const dialog = $('#case-dialog');
const allSources = items => [...new Map(items.flatMap(c=>c.sources.map(s=>({...s,caseTitle:c.title}))).map(s=>[s.url,s])).values()];
const languageKey = isEnglish ? 'en' : 'pt';
const activeDossier = () => dossiers[person];
function compareCases(a,b){const sort=state.sorts.cases;return sort==='severity'?compareCaseSeverity(a,b):sort==='title'?a.title.localeCompare(b.title,locale):sort==='old'?a.updated.localeCompare(b.updated):b.updated.localeCompare(a.updated);}
function filtered(){return records.filter(c=>(state.category==='all'||c.category===state.category)&&(state.status==='all'||(state.status==='encerrado'?caseDisposition(c)==='closed':c.state===state.status))&&(!state.query||normalize(JSON.stringify(c)).includes(normalize(state.query)))).sort(compareCases);}
function severityLabel(c){return severityFor(c)?.label[languageKey]||tr('Sem classificação','Unclassified');}
function renderSeverityGuide(){
  $('#severity-guide').innerHTML=`<summary>${tr('Como ordenamos por gravidade','How severity ordering works')}</summary><p>${tr('Classificação editorial do impacto potencial dos fatos descritos, da maior para a menor gravidade. Não é uma escala oficial, estimativa de pena ou conclusão de culpa. A situação processual aparece separadamente.','An editorial assessment of the potential impact of the facts described, from higher to lower severity. This is not an official scale, a sentencing estimate or a finding of guilt. Procedural status is shown separately.')}</p><ol>${severityBands.map(b=>`<li><strong>${esc(b.label[languageKey])}.</strong> ${esc(b.description[languageKey])}</li>`).join('')}</ol><p>${tr('Dentro de cada faixa, há empate em gravidade: primeiro vem o registro mais recente; em datas iguais, o ID da ficha. Pedidos sobre fatos pouco individualizados são classificados pelo objeto explícito da ficha, sem presumir outras acusações.','Cases within a band are tied in severity: the latest documented update comes first, followed by the record ID for equal dates. Requests involving facts that are not fully specified are classified by the record’s explicit subject, without assuming additional allegations.')}</p>`;
}

function render(){
  $('#categories').innerHTML = [['all',tr('Todos os registros','All records')],...categories.map(c=>[c,c])].map(([value,label])=>`<button class="${state.category===value?'active':''}" data-category="${value}" aria-pressed="${state.category===value}">${label}<span>${value==='all'?countedCases(records).length:countedCases(records).filter(c=>c.category===value).length}</span></button>`).join('');
  const items=filtered(); const counted=countedCases(items); let html='';
  const sortOptions=[...(state.view==='cases'?[['severity',tr('Maior gravidade ↓','Highest severity ↓')]]:[]),['recent',tr('Mais recentes','Most recent')],['old',tr('Mais antigos','Oldest first')],...(state.view==='cases'?[['title',tr('Nome do caso','Case name')]]:[])];
  $('#sort').innerHTML=sortOptions.map(([value,label])=>`<option value="${value}" ${state.sorts[state.view]===value?'selected':''}>${label}</option>`).join('');
  $('#severity-guide').hidden=state.view!=='cases'||state.sorts.cases!=='severity';
  document.querySelectorAll('[data-view]').forEach(b=>{const selected=b.dataset.view===state.view;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});
  $('#results').setAttribute('aria-labelledby',`tab-${state.view}`);
  if(state.view==='cases'){
    $('#results-count').textContent=`${counted.length} ${tr('em andamento ou com condenação / sanção vigente','ongoing or with a standing judgment / sanction')}`;
    html=items.map((c,index)=>`<article class="case-card severity-${severityFor(c)?.id}"><div class="case-top"><span class="case-category">${esc(c.category)} · ${esc(c.court)}</span><time datetime="${c.updated}">${date(c.updated)}</time></div><h3><button data-case="${c.id}">${esc(c.title)}</button></h3><span class="badge ${c.state} severity-${severityFor(c)?.id}">${esc(c.status)}</span><p class="case-severity">${tr('Gravidade editorial','Editorial severity')}: <strong>${esc(severityLabel(c))}</strong></p><p class="case-summary">${esc(c.summary)}</p><div class="case-foot"><span><strong>${esc(c.role)}</strong> · ${tr('Fontes na ficha','Sources in record')}</span><button class="open-case" data-case="${c.id}">${tr('Ler ficha','Read record')} <span aria-hidden="true">↗</span></button></div></article>`).join('');
  } else if(state.view==='timeline'){
    const events=items.flatMap(c=>c.events.map(e=>({...e,caseId:c.id,caseTitle:c.title}))).sort((a,b)=>state.sorts[state.view]==='old'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
    $('#results-count').textContent=`${counted.length} ${tr('em andamento ou com condenação / sanção vigente','ongoing or with a standing judgment / sanction')}`;
    html=events.map(e=>`<article class="timeline-entry"><time datetime="${e.date}">${date(e.date)}</time><div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p><button data-case="${e.caseId}">${esc(e.caseTitle)} ↗</button></div></article>`).join('');
  } else {
    const sources=allSources(items).sort((a,b)=>state.sorts[state.view]==='old'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
    $('#results-count').textContent=`${allSources(counted).length} ${tr('fontes das fichas exibidas','sources for the displayed records')}`;
    html=sources.map(s=>`<article class="source-row"><div><div class="source-meta">${esc(s.publisher)} · ${date(s.date)} · ${s.type==='official'?tr('INSTITUCIONAL','OFFICIAL'):tr('JORNALISMO','JOURNALISM')}</div><h3><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a></h3><p>${esc(s.caseTitle)}</p></div><span aria-hidden="true">↗</span></article>`).join('');
  }
  $('#results').innerHTML=html||`<div class="empty"><h3>${tr('Nenhum registro encontrado.','No records found.')}</h3><p>${tr('Tente outro termo ou limpe os filtros para explorar o acervo completo.','Try another term or clear the filters to explore the full archive.')}</p><button class="open-case" data-reset>${tr('Limpar filtros','Clear filters')} ↺</button></div>`;
}
function openCase(id,updateHash=true){
  const c=records.find(x=>x.id===id);if(!c){toast(tr('Esta ficha não faz parte do recorte atual do acervo.','This record is outside the archive’s current scope.'));history.replaceState(null,'','#acervo');return;}
  currentCase=c;
  $('#dialog-content').innerHTML=`<div class="dialog-heading"><span class="eyebrow">${esc(c.category)} · ${esc(c.court)}</span><span class="badge ${c.state} severity-${severityFor(c)?.id}">${esc(c.status)}</span></div><h2 id="dialog-title">${esc(c.title)}</h2><p class="dialog-summary">${esc(c.summary)}</p><div class="fact-grid"><div><span>${tr('PAPEL DOCUMENTADO','DOCUMENTED ROLE')}</span><strong>${esc(c.role)}</strong></div><div><span>${tr('ÚLTIMO REGISTRO LOCALIZADO','LATEST RECORD LOCATED')}</span><strong>${date(c.updated)}</strong></div><div><span>${tr('ÓRGÃO / ESFERA','INSTITUTION / JURISDICTION')}</span><strong>${esc(c.court)}</strong></div><div><span>${tr('IDENTIFICAÇÃO','CASE IDENTIFIER')}</span><strong>${esc(c.identifier||tr('Número não confirmado nas fontes abertas','Case number not confirmed in open sources'))}</strong></div></div><section class="detail-section severity-detail"><h3>${tr('Critério de gravidade editorial','Editorial severity rationale')}</h3><p><strong>${esc(severityLabel(c))}.</strong> ${esc(severityFor(c)?.reason[languageKey]||'')}</p></section><section class="detail-section"><h3>${tr('O que foi documentado','What was documented')}</h3><p>${esc(c.details)}</p></section><section class="detail-section defense-box"><h3>${tr('Posição da defesa / contraponto','Defense response / counterpoint')}</h3><p>${esc(c.defense)}</p></section><p class="scope-note"><strong>${tr('Limite desta ficha.','Limitations of this record.')}</strong> ${esc(c.limit)}</p><section class="detail-section"><h3>${tr('Histórico essencial','Key developments')}</h3><ul>${c.events.map(e=>`<li><time datetime="${e.date}">${date(e.date)}</time> <strong>${esc(e.title)}.</strong> ${esc(e.text)}</li>`).join('')}</ul></section><section class="detail-section"><h3>${tr('Fontes e documentos','Sources and documents')}</h3>${c.sources.map(s=>`<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗<small>${esc(s.publisher)} · ${date(s.date)} · ${s.type==='official'?tr('Fonte institucional','Official source'):tr('Reportagem','News report')}${s.note?' · '+esc(s.note):''}</small></a>`).join('')}</section><div class="dialog-actions"><a data-language href="${isEnglish?'../':'en/'}" lang="${isEnglish?'pt-BR':'en'}" hreflang="${isEnglish?'pt-BR':'en'}">${tr('Ler em inglês','Read in Portuguese')} ↗</a><button id="copy-case">${tr('Copiar link da ficha','Copy record link')} ↗</button><button id="print-case">${tr('Imprimir ficha','Print record')} ↓</button></div>`;
  if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
  if(updateHash)history.pushState(null,'',personUrl(location.href,person,'#caso='+encodeURIComponent(id)));
  syncLanguageLinks();
}
function clearFilters(){state.category='all';state.status='all';state.query='';$('#search').value='';$('#status').value='all';render();}
function toast(message){$('#toast').textContent=message;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',3500);}
document.addEventListener('click',async e=>{
  const language=e.target.closest('[data-language]');if(language){language.search=location.search;language.hash=location.hash;return;}
  const target=e.target.closest('button');if(!target)return;
  if(target.dataset.person){history.pushState(null,'',personUrl(location.href,target.dataset.person));route();}
  if(target.dataset.case)openCase(target.dataset.case);
  if(target.dataset.category){state.category=target.dataset.category;render();}
  if(target.dataset.view){state.view=target.dataset.view;render();}
  if(target.id==='reset'||target.hasAttribute('data-reset'))clearFilters();
  if(target.id==='close-dialog')closeCase();
  if(target.id==='print-case')window.print();
  if(target.id==='copy-case'){try{await navigator.clipboard.writeText(location.href);toast(tr('Link da ficha copiado.',"Record link copied."));}catch{toast(tr('Copie o endereço desta página na barra do navegador.',"Copy this page’s address from your browser’s address bar."));}}
  if(target.id==='export'){const blob=new Blob([JSON.stringify({title:tr('Observatório Público — ','Public Observatory — ')+activeDossier().name,person,language:isEnglish?'en':'pt-BR',countedCases:countedCases(records).length,countingScope:tr('Somente em andamento ou com condenação/sanção vigente na última informação localizada. Históricos encerrados não integram esta exportação.','Only ongoing proceedings or standing judgments/sanctions in the latest information located. Closed historical records are excluded from this export.'),researchedAt:activeDossier().researchedAt,scope:activeDossier().scope[languageKey],editorialOrder:tr('Gravidade potencial em faixas; empates por data do último registro. Não é conclusão de culpa.','Potential severity bands; ties ordered by latest record date. Not a finding of guilt.'),records:[...records].sort(compareCaseSeverity).map(c=>({...c,editorialSeverity:{band:severityFor(c)?.id,rank:severityFor(c)?.rank,label:severityLabel(c),reason:severityFor(c)?.reason[languageKey]}}))},null,2)],{type:'application/json;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`observatorio-${person}${isEnglish?'-en':''}-${activeDossier().researchedAt}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(tr('Dados e fontes exportados.',"Data and sources exported."));}
});
$('#search').addEventListener('input',e=>{state.query=e.target.value;render();});
$('#status').addEventListener('change',e=>{state.status=e.target.value;render();});
$('#sort').addEventListener('change',e=>{state.sorts[state.view]=e.target.value;render();});
$('.view-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=[...document.querySelectorAll('[data-view]')];let i=tabs.indexOf(document.activeElement);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].focus();state.view=tabs[i].dataset.view;render();});
dialog.addEventListener('cancel',e=>{e.preventDefault();closeCase();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeCase();}});
function syncLanguageLinks(){
  document.querySelectorAll('[data-language]').forEach(link=>{link.search=location.search;link.hash=location.hash;});
}
function closeCase(){
  if(location.hash.startsWith('#caso='))history.replaceState(null,'',personUrl(location.href,person,'#acervo'));
  dialog.close();currentCase=null;syncLanguageLinks();
}
function renderDossier(){
  const dossier=activeDossier();
  $('#subject').innerHTML=dossier.heading;
  $('#subject-full-name').hidden=person!=='lula';
  $('#subject-full-name').textContent=dossier.name;
  $('#subject-description').textContent=dossier.description[languageKey];
  $('#subject-scope').textContent=dossier.scope[languageKey];
  document.title=dossier.name+' — '+tr('Observatório Público','Public Observatory');
  $('meta[name="description"]').content=dossier.description[languageKey];
  document.querySelectorAll('[data-person]').forEach(tab=>{
    const selected=tab.dataset.person===person;
    tab.setAttribute('aria-selected',selected);tab.tabIndex=selected?0:-1;
  });
  $('#dossier-panel').setAttribute('aria-labelledby','person-'+person);
  const entry=archives.get(person);
  records=entry?.records||[];
  const active=countedCases(records);
  $('#record-total').textContent=entry?.records?String(active.length).padStart(2,'0'):'—';
  $('#severity-totals').innerHTML=severityBands.map(b=>`<div class="severity-stat severity-${b.id}"><strong>${entry?.records?active.filter(c=>severityFor(c)?.id===b.id).length:'—'}</strong><span>${esc(b.label[languageKey])}</span></div>`).join('');
  $('#tab-count').textContent=entry?.records?active.length:'';
  $('#export').disabled=!entry?.records;

  renderSeverityGuide();render();syncLanguageLinks();
  if(!entry?.records){
    $('#results-count').textContent=loading?tr('Carregando fichas…','Loading records…'):tr('Acervo indisponível','Archive unavailable');
    $('#results').innerHTML=`<div class="empty"><h3>${loading?tr('Carregando este dossiê…','Loading this dossier…'):tr('Não foi possível carregar este dossiê.','Unable to load this dossier.')}</h3><p>${loading?'':tr('Verifique sua conexão e recarregue a página. A outra aba continua disponível.','Check your connection and reload the page. The other tab remains available.')}</p></div>`;
  }
}
function route(){
  const next=readRoute(new URL(location.href));
  if(person!==next.person){
    person=next.person;
    state.view='cases';state.category='all';state.status='all';state.query='';
    state.sorts={cases:'severity',timeline:'recent',sources:'recent'};
    $('#search').value='';$('#status').value='all';
  }
  if(dialog.open)dialog.close();
  currentCase=null;
  renderDossier();
  if(next.caseId&&archives.get(person)?.records)openCase(next.caseId,false);
}
$('.person-tabs').addEventListener('keydown',e=>{
  if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
  e.preventDefault();
  const tabs=[...document.querySelectorAll('[data-person]')];
  let i=tabs.indexOf(document.activeElement);
  i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  tabs[i].focus();tabs[i].click();
});
window.addEventListener('hashchange',route);
window.addEventListener('popstate',route);
renderDossier();
await Promise.all(Object.entries(dossiers).map(async([id,dossier])=>{
  try{
    const response=await fetch(new URL(dossier.files[languageKey],import.meta.url));
    if(!response.ok)throw Error('Archive unavailable');
    const data=await response.json();
    if(!Array.isArray(data))throw Error('Invalid archive');
    archives.set(id,{records:countedCases(data)});
    $(`[data-person-count="${id}"]`).textContent=countedCases(data).length;
  }catch{archives.set(id,{error:true});}
}));
loading=false;route();
