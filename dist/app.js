'use strict';
import {severityBands,severityFor,compareCaseSeverity} from './severity.mjs';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const isEnglish = document.documentElement.lang === 'en';
const tr = (pt,en) => isEnglish ? en : pt;
const locale = isEnglish ? 'en-GB' : 'pt-BR';
const date = s => new Date(s+'T12:00:00').toLocaleDateString(locale,isEnglish?{day:'2-digit',month:'short',year:'numeric'}:undefined);
const state = {view:'cases',category:'all',status:'all',query:'',sorts:{cases:'severity',timeline:'recent',sources:'recent'}};
const categories = isEnglish ? ['Criminal','Electoral','Civil','Parliamentary'] : ['Criminal','Eleitoral','Cível','Parlamentar'];
let records = [], currentCase = null;
const dialog = $('#case-dialog');
const allSources = items => [...new Map(items.flatMap(c=>c.sources.map(s=>({...s,caseTitle:c.title}))).map(s=>[s.url,s])).values()];
const languageKey = isEnglish ? 'en' : 'pt';
function compareCases(a,b){const sort=state.sorts.cases;return sort==='severity'?compareCaseSeverity(a,b):sort==='title'?a.title.localeCompare(b.title,locale):sort==='old'?a.updated.localeCompare(b.updated):b.updated.localeCompare(a.updated);}
function filtered(){return records.filter(c=>(state.category==='all'||c.category===state.category)&&(state.status==='all'||c.state===state.status)&&(!state.query||normalize(JSON.stringify(c)).includes(normalize(state.query)))).sort(compareCases);}
function severityLabel(c){return severityFor(c)?.label[languageKey]||tr('Sem classificação','Unclassified');}
function renderSeverityGuide(){
  $('#severity-guide').innerHTML=`<summary>${tr('Como ordenamos por gravidade','How severity ordering works')}</summary><p>${tr('Classificação editorial do impacto potencial dos fatos descritos, da maior para a menor gravidade. Não é uma escala oficial, estimativa de pena ou conclusão de culpa. A situação processual aparece separadamente.','An editorial assessment of the potential impact of the facts described, from higher to lower severity. This is not an official scale, a sentencing estimate or a finding of guilt. Procedural status is shown separately.')}</p><ol>${severityBands.map(b=>`<li><strong>${esc(b.label[languageKey])}.</strong> ${esc(b.description[languageKey])}</li>`).join('')}</ol><p>${tr('Dentro de cada faixa, há empate em gravidade: primeiro vem o registro mais recente; em datas iguais, o ID da ficha. Pedidos sobre fatos pouco individualizados são classificados pelo objeto explícito da ficha, sem presumir outras acusações.','Cases within a band are tied in severity: the latest documented update comes first, followed by the record ID for equal dates. Requests involving facts that are not fully specified are classified by the record’s explicit subject, without assuming additional allegations.')}</p>`;
}

function render(){
  $('#categories').innerHTML = [['all',tr('Todos os registros','All records')],...categories.map(c=>[c,c])].map(([value,label])=>`<button class="${state.category===value?'active':''}" data-category="${value}" aria-pressed="${state.category===value}">${label}<span>${value==='all'?records.length:records.filter(c=>c.category===value).length}</span></button>`).join('');
  const items=filtered(); let html='';
  const sortOptions=[...(state.view==='cases'?[['severity',tr('Maior gravidade ↓','Highest severity ↓')]]:[]),['recent',tr('Mais recentes','Most recent')],['old',tr('Mais antigos','Oldest first')],...(state.view==='cases'?[['title',tr('Nome do caso','Case name')]]:[])];
  $('#sort').innerHTML=sortOptions.map(([value,label])=>`<option value="${value}" ${state.sorts[state.view]===value?'selected':''}>${label}</option>`).join('');
  $('#severity-guide').hidden=state.view!=='cases'||state.sorts.cases!=='severity';
  document.querySelectorAll('[data-view]').forEach(b=>{const selected=b.dataset.view===state.view;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});
  $('#results').setAttribute('aria-labelledby',`tab-${state.view}`);
  if(state.view==='cases'){
    $('#results-count').textContent=`${items.length} ${tr('de','of')} ${records.length} ${tr('fichas documentais','case records')}`;
    html=items.map((c,index)=>`<article class="case-card"><div class="case-top"><span class="case-category"><span class="case-num">${String(index+1).padStart(2,'0')}</span>${esc(c.category)} · ${esc(c.court)}</span><time datetime="${c.updated}">${date(c.updated)}</time></div><h3><button data-case="${c.id}">${esc(c.title)}</button></h3><span class="badge ${c.state}">${esc(c.status)}</span><p class="case-severity">${tr('Gravidade editorial','Editorial severity')}: <strong>${esc(severityLabel(c))}</strong></p><p class="case-summary">${esc(c.summary)}</p><div class="case-foot"><span><strong>${esc(c.role)}</strong> · ${c.sources.length} ${tr('fonte','source')}${c.sources.length===1?'':'s'}</span><button class="open-case" data-case="${c.id}">${tr('Ler ficha','Read record')} <span aria-hidden="true">↗</span></button></div></article>`).join('');
  } else if(state.view==='timeline'){
    const events=items.flatMap(c=>c.events.map(e=>({...e,caseId:c.id,caseTitle:c.title}))).sort((a,b)=>state.sorts[state.view]==='old'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
    $('#results-count').textContent=`${events.length} ${tr('marcos documentados',events.length===1?'documented event':'documented events')} · ${items.length} ${tr('fichas',items.length===1?'record':'records')}`;
    html=events.map(e=>`<article class="timeline-entry"><time datetime="${e.date}">${date(e.date)}</time><div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p><button data-case="${e.caseId}">${esc(e.caseTitle)} ↗</button></div></article>`).join('');
  } else {
    const sources=allSources(items).sort((a,b)=>state.sorts[state.view]==='old'?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
    $('#results-count').textContent=`${sources.length} ${tr('fontes únicas nos registros selecionados',sources.length===1?'unique source in the selected records':'unique sources in the selected records')}`;
    html=sources.map(s=>`<article class="source-row"><div><div class="source-meta">${esc(s.publisher)} · ${date(s.date)} · ${s.type==='official'?tr('INSTITUCIONAL','OFFICIAL'):tr('JORNALISMO','JOURNALISM')}</div><h3><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a></h3><p>${esc(s.caseTitle)}</p></div><span aria-hidden="true">↗</span></article>`).join('');
  }
  $('#results').innerHTML=html||`<div class="empty"><h3>${tr('Nenhum registro encontrado.','No records found.')}</h3><p>${tr('Tente outro termo ou limpe os filtros para explorar o acervo completo.','Try another term or clear the filters to explore the full archive.')}</p><button class="open-case" data-reset>${tr('Limpar filtros','Clear filters')} ↺</button></div>`;
}
function openCase(id,updateHash=true){
  const c=records.find(x=>x.id===id);if(!c){toast(tr('Esta ficha não faz parte do recorte atual do acervo.','This record is outside the archive’s current scope.'));history.replaceState(null,'','#acervo');return;}
  currentCase=c;
  $('#dialog-content').innerHTML=`<div class="dialog-heading"><span class="eyebrow">${esc(c.category)} · ${esc(c.court)}</span><span class="badge ${c.state}">${esc(c.status)}</span></div><h2 id="dialog-title">${esc(c.title)}</h2><p class="dialog-summary">${esc(c.summary)}</p><div class="fact-grid"><div><span>${tr('PAPEL DOCUMENTADO','DOCUMENTED ROLE')}</span><strong>${esc(c.role)}</strong></div><div><span>${tr('ÚLTIMO REGISTRO LOCALIZADO','LATEST RECORD LOCATED')}</span><strong>${date(c.updated)}</strong></div><div><span>${tr('ÓRGÃO / ESFERA','INSTITUTION / JURISDICTION')}</span><strong>${esc(c.court)}</strong></div><div><span>${tr('IDENTIFICAÇÃO','CASE IDENTIFIER')}</span><strong>${esc(c.identifier||tr('Número não confirmado nas fontes abertas','Case number not confirmed in open sources'))}</strong></div></div><section class="detail-section severity-detail"><h3>${tr('Critério de gravidade editorial','Editorial severity rationale')}</h3><p><strong>${esc(severityLabel(c))}.</strong> ${esc(severityFor(c)?.reason[languageKey]||'')}</p></section><section class="detail-section"><h3>${tr('O que foi documentado','What was documented')}</h3><p>${esc(c.details)}</p></section><section class="detail-section defense-box"><h3>${tr('Posição da defesa / contraponto','Defense response / counterpoint')}</h3><p>${esc(c.defense)}</p></section><p class="scope-note"><strong>${tr('Limite desta ficha.','Limitations of this record.')}</strong> ${esc(c.limit)}</p><section class="detail-section"><h3>${tr('Histórico essencial','Key developments')}</h3><ul>${c.events.map(e=>`<li><time datetime="${e.date}">${date(e.date)}</time> <strong>${esc(e.title)}.</strong> ${esc(e.text)}</li>`).join('')}</ul></section><section class="detail-section"><h3>${tr('Fontes e documentos','Sources and documents')}</h3>${c.sources.map(s=>`<a class="source-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗<small>${esc(s.publisher)} · ${date(s.date)} · ${s.type==='official'?tr('Fonte institucional','Official source'):tr('Reportagem','News report')}${s.note?' · '+esc(s.note):''}</small></a>`).join('')}</section><div class="dialog-actions"><a data-language href="${isEnglish?'../':'en/'}" lang="${isEnglish?'pt-BR':'en'}" hreflang="${isEnglish?'pt-BR':'en'}">${tr('Ler em inglês','Read in Portuguese')} ↗</a><button id="copy-case">${tr('Copiar link da ficha','Copy record link')} ↗</button><button id="print-case">${tr('Imprimir ficha','Print record')} ↓</button></div>`;
  if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
  if(updateHash)history.replaceState(null,'','#caso='+encodeURIComponent(id));
}
function clearFilters(){state.category='all';state.status='all';state.query='';$('#search').value='';$('#status').value='all';render();}
function toast(message){$('#toast').textContent=message;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',3500);}
document.addEventListener('click',async e=>{
  const language=e.target.closest('[data-language]');if(language){language.hash=location.hash;return;}
  const target=e.target.closest('button');if(!target)return;
  if(target.dataset.case)openCase(target.dataset.case);
  if(target.dataset.category){state.category=target.dataset.category;render();}
  if(target.dataset.view){state.view=target.dataset.view;render();}
  if(target.id==='reset'||target.hasAttribute('data-reset'))clearFilters();
  if(target.id==='close-dialog')dialog.close();
  if(target.id==='print-case')window.print();
  if(target.id==='copy-case'){try{await navigator.clipboard.writeText(location.href);toast(tr('Link da ficha copiado.',"Record link copied."));}catch{toast(tr('Copie o endereço desta página na barra do navegador.',"Copy this page’s address from your browser’s address bar."));}}
  if(target.id==='export'){const blob=new Blob([JSON.stringify({title:tr('Observatório Público — Flávio Bolsonaro','Public Observatory — Flávio Bolsonaro'),language:isEnglish?'en':'pt-BR',researchedAt:'2026-10-27',scope:tr('Ações, investigações e pedidos de apuração contra Flávio Bolsonaro. Fontes abertas, sem garantia de exaustividade. Fichas não equivalem a processos independentes.','Cases, investigations and requests for inquiries against Flávio Bolsonaro. Open sources, with no guarantee of completeness. Records do not represent independent proceedings.'),editorialOrder:tr('Gravidade potencial em faixas; empates por data do último registro. Não é conclusão de culpa.','Potential severity bands; ties ordered by latest record date. Not a finding of guilt.'),records:[...records].sort(compareCaseSeverity).map(c=>({...c,editorialSeverity:{band:severityFor(c)?.id,rank:severityFor(c)?.rank,label:severityLabel(c),reason:severityFor(c)?.reason[languageKey]}}))},null,2)],{type:'application/json;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=isEnglish?'observatorio-flavio-en-2026-10-27.json':'observatorio-flavio-2026-10-27.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast(tr('Dados e fontes exportados.',"Data and sources exported."));}
});
$('#search').addEventListener('input',e=>{state.query=e.target.value;render();});
$('#status').addEventListener('change',e=>{state.status=e.target.value;render();});
$('#sort').addEventListener('change',e=>{state.sorts[state.view]=e.target.value;render();});
$('.view-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=[...document.querySelectorAll('[data-view]')];let i=tabs.indexOf(document.activeElement);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].focus();state.view=tabs[i].dataset.view;render();});
dialog.addEventListener('close',()=>{if(location.hash.startsWith('#caso='))history.replaceState(null,'','#acervo');});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
function hashRoute(){if(location.hash.startsWith('#caso='))openCase(decodeURIComponent(location.hash.slice(6)),false);}
window.addEventListener('hashchange',hashRoute);
fetch(document.documentElement.dataset.source||'data.json').then(r=>{if(!r.ok)throw Error(tr('Não foi possível carregar o acervo.','Unable to load the archive.'));return r.json();}).then(data=>{records=data;const sources=allSources(records);$('#record-total').textContent=records.length.toString().padStart(2,'0');$('#source-total').textContent=sources.length;$('#official-total').textContent=sources.filter(s=>s.type==='official').length;$('#tab-count').textContent=records.length;renderSeverityGuide();render();hashRoute();}).catch(()=>{$('#results-count').textContent=tr('Acervo indisponível','Archive unavailable');$('#results').innerHTML=`<div class="empty"><h3>${tr('Não foi possível carregar as fichas.','Unable to load the records.')}</h3><p>${tr('Verifique sua conexão e recarregue a página.','Check your connection and reload the page.')}</p><button class="open-case" onclick="location.reload()">${tr('Tentar novamente','Try again')} ↻</button></div>`;});
