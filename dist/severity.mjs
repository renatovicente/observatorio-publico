import lulaSeverity from './lula-severity.mjs';
// Editorial assessment of potential impact, separate from the factual case records.
// Bands are ordinal, not legal scores, sentencing estimates or findings of guilt.
export const severityBands = [
  {id:'financial',rank:5,label:{pt:'Recursos públicos e crimes financeiros',en:'Public funds and financial offenses'},description:{pt:'Suspeitas individualizadas de desvio de recursos, corrupção, lavagem de dinheiro ou evasão de divisas.',en:'Specific allegations of diversion of funds, corruption, money laundering or unlawful transfers abroad.'}},
  {id:'institutional',rank:4,label:{pt:'Integridade institucional e eleitoral',en:'Institutional and electoral integrity'},description:{pt:'Alegado uso de estruturas públicas, interferência em apurações, abuso eleitoral coordenado e questões disciplinares de alcance institucional.',en:'Alleged use of public resources, interference in inquiries, coordinated electoral abuse and disciplinary matters with institutional implications.'}},
  {id:'information',rank:3,label:{pt:'Informação, honra e transparência',en:'Information, reputation and transparency'},description:{pt:'Publicações, declarações e pedidos de esclarecimento patrimonial, sem atribuir crimes financeiros não individualizados na ficha.',en:'Publications, statements and requests for scrutiny of assets, without attributing financial offenses not specified in the record.'}},
  {id:'civil',rank:2,label:{pt:'Obrigações e direitos civis',en:'Civil obligations and rights'},description:{pt:'Cobranças e disputas sobre direitos de imagem ou autoria, com impacto patrimonial privado descrito.',en:'Payment claims and disputes over image or authorship rights, involving the private financial impact described in the record.'}},
  {id:'procedural',rank:1,label:{pt:'Comparecimento a ato processual',en:'Attendance at a procedural hearing'},description:{pt:'Representação relativa à ausência em um ato específico, sem estender a imputação aos demais fatos da operação.',en:'A complaint about absence from a specific hearing, without extending the allegation to other matters in the operation.'}}
];

const entry=(band,pt,en)=>({band,reason:{pt,en}});
const electoral=()=>entry('information',
  'A ficha trata da divulgação de conteúdo eleitoral contestado. A posição considera seu potencial impacto informacional; a sanção e o desfecho permanecem descritos separadamente.',
  'This record concerns the dissemination of disputed electoral content. Its position reflects the potential informational impact; the sanction and outcome are described separately.');
const filmPetition=()=>entry('institutional',
  'Pedido disciplinar sobre relações e declarações ligadas ao financiamento do filme. O objeto é a integridade do mandato; a petição não comprova crime financeiro nem admissão do procedimento.',
  'A disciplinary request about relationships and statements linked to the film’s financing. The subject is integrity in office; the petition establishes neither a financial offense nor admission of the proceedings.');

export const recordSeverity = {
  ...lulaSeverity,
  'rachadinhas-alerj':entry('financial','A acusação descrita envolve desvio de salários de assessores e lavagem de dinheiro. A gravidade potencial do objeto não altera a informação de que a denúncia foi rejeitada após a anulação de provas.','The allegation described concerns diversion of staff salaries and money laundering. The potential seriousness of the subject does not change the fact that the complaint was rejected after evidence was invalidated.'),
  'dark-horse':entry('financial','A apuração descrita envolve suspeitas de lavagem de dinheiro, evasão de divisas e corrupção no financiamento do filme. Investigação não equivale a condenação.','The inquiry described concerns suspected money laundering, unlawful transfers abroad and corruption in financing the film. An investigation is not a conviction.'),
  'willer-tomaz':entry('financial','A ficha descreve apuração de suspeitas de lavagem de dinheiro e evasão de divisas. As medidas cautelares não comprovam essas suspeitas e não são usadas como prova de culpa nesta classificação.','The record describes an inquiry into suspected money laundering and unlawful transfers abroad. Interim restrictions do not prove these allegations and are not treated as evidence of guilt in this classification.'),
  'etica-2024':entry('institutional','A representação trata de alegada interferência em apurações e de episódios ligados ao gabinete. A classificação se refere ao potencial impacto sobre instituições públicas.','The complaint concerns alleged interference in inquiries and episodes involving the parliamentary office. The classification reflects potential impact on public institutions.'),
  'rede-collabs':entry('institutional','A alegação envolve uma rede coordenada de perfis e possível uso de estruturas de gabinete em benefício eleitoral. Esse alcance coletivo distingue o objeto de uma publicação isolada.','The allegation involves a coordinated profile network and possible use of parliamentary office resources for electoral benefit. That collective reach distinguishes the subject from an individual post.'),
  'cpi-pandemia':entry('institutional','Considera-se a proposta de apuração de incitação ao crime mencionada na ficha e seu contexto institucional. Não se atribuem a Flávio mortes, todos os fatos da CPI ou os delitos imputados a terceiros.','This assessment considers the proposed inquiry into incitement to crime mentioned in the record and its institutional context. It does not attribute deaths, all matters covered by the committee or offenses alleged against others to Flávio.'),
  'etica-pce-6-2026':filmPetition(),
  'etica-pce-7-2026':filmPetition(),
  'etica-pce-14-2026':filmPetition(),
  'etica-pce-22-2026':filmPetition(),
  'etica-pce-11-2026':entry('information','A petição questiona um vídeo produzido com IA e participações na convenção. A classificação considera o conteúdo e a comunicação política descritos, sem presumir admissão do pedido.','The petition challenges an AI-generated video and participation in the convention. The classification considers the content and political communication described, without assuming the petition was admitted.'),
  'calunia-lula':entry('information','A apuração trata de possível imputação falsa de crime em postagens. O objeto envolve honra e informação pública; a conclusão policial não é julgamento definitivo.','The inquiry concerns possible false criminal allegations in posts. Its subject involves reputation and public information; police findings are not a final judgment.'),
  'imoveis-especie':entry('information','O registro é de um pedido de esclarecimento sobre aquisições patrimoniais, arquivado por insuficiência de indícios. Compra em espécie não é tratada aqui como prova de crime financeiro.','The record concerns a request to scrutinize asset purchases, dismissed for insufficient indications of wrongdoing. Cash purchases are not treated here as evidence of a financial offense.'),
  'declaracao-bens-2014':entry('information','A suspeita descrita diz respeito à veracidade da declaração eleitoral de bens. A investigação foi trancada por excesso de prazo; não se acrescenta imputação de lavagem ou desvio.','The suspicion described concerns the accuracy of an electoral asset declaration. The inquiry was terminated for excessive delay; no allegation of money laundering or diversion is added.'),
  'ia-publicacoes-maio':electoral(),
  'video-faccoes-junho':electoral(),
  'celso-daniel':electoral(),
  'satanismo-2024':electoral(),
  'video-mei':electoral(),
  'aposentados-2023':electoral(),
  'video-demonio':electoral(),
  'video-nikolas':electoral(),
  'santini-contas':entry('civil','A cobrança versa sobre divisão de lucros e pagamentos entre ex-sócios. A classificação considera a disputa patrimonial privada, sem converter o valor pedido em dano comprovado.','The claim concerns profit sharing and payments between former partners. The classification considers the private financial dispute without treating the amount claimed as proven damage.'),
  'fotografa':entry('civil','O objeto é o uso de fotografia e a indenização civil correspondente. A sentença de primeira instância e a ausência de desfecho recursal confirmado continuam indicadas na ficha.','The subject is use of a photograph and the corresponding civil damages. The first-instance judgment and absence of a confirmed appeal outcome remain identified in the record.'),
  'chico-buarque':entry('civil','O objeto é o uso de uma capa de disco em uma montagem. A posição não muda o desfecho favorável documentado: a indenização foi afastada em recurso.','The subject is use of an album cover in an edited image. Its position does not change the documented favorable outcome: the damages award was overturned on appeal.'),
  'furna-acareacao':entry('procedural','A representação se limita à ausência em acareação e foi arquivada. Não se classifica Flávio como responsável pelos demais fatos da Operação Furna da Onça.','The complaint is limited to absence from a confrontation hearing and was closed. It does not classify Flávio as responsible for other matters in Operation Furna da Onça.'),
  'videos-inss-outubro-2026':entry('information',"A ficha trata de decisão eleitoral sobre publicações que associavam Lula a suspeitas de fraude. A medida é liminar e não constitui condenação criminal.","The record concerns an electoral ruling on posts linking Lula to fraud allegations. The measure is interim and is not a criminal conviction."),
  'pgr-pagamentos-escritorio':entry('financial',"O pedido menciona pagamentos privados e requer apuração de possíveis corrupção e lavagem de dinheiro. A representação não comprova abertura de inquérito nem irregularidade.","The request concerns private payments and seeks an inquiry into possible corruption and money laundering. The complaint does not establish that an inquiry was opened or that wrongdoing occurred."),
  'pf-carta-brasao':entry('institutional',"O pedido envolve alegado uso de símbolo oficial e apresentação como presidente eleito. A notícia de fato não comprova abertura de inquérito ou prática de crime.","The request concerns alleged use of an official symbol and presentation as president-elect. Filing the report does not establish that an inquiry was opened or that an offense occurred."),
  'etica-pce-23-2026':entry('institutional',"A petição pede apuração disciplinar de alegado descumprimento de ordem judicial e da saída do país. A admissão do procedimento não foi confirmada.","The petition seeks a disciplinary inquiry into an alleged breach of a court order and departure from Brazil. Admission of proceedings was not confirmed."),
  'aije-dark-horse-eleitoral':entry('institutional','A AIJE apura possível benefício eleitoral ligado ao financiamento do filme. A admissão trata apenas dos requisitos formais e não comprova abuso ou irregularidade.','The AIJE examines a possible electoral benefit connected to the film’s financing. Admission addresses formal requirements only and does not establish abuse or wrongdoing.'),
  'aije-grupos-armados-rj':entry('institutional','A AIJE apura possível interferência de controle territorial armado na liberdade do voto. As ligações citadas são alegações da parte autora, sem conclusão de mérito.','The AIJE examines possible interference by armed territorial control with freedom of choice. The cited links are allegations by the applicant, with no ruling on the merits.'),
  'aije-pressao-eua':entry('institutional','A AIJE apura possível benefício eleitoral de pressões por retaliações externas. O recebimento não confirma participação pessoal de Flávio nem abuso eleitoral.','The AIJE examines a possible electoral benefit from pressure for foreign retaliation. Admission does not establish Flávio’s personal participation or electoral abuse.'),
  'acao-popular-salario':entry('civil',"A ação pede suspensão de salário e verbas do mandato por permanência no exterior. A distribuição não equivale a decisão sobre o pedido ou a dano comprovado.","The action seeks suspension of salary and parliamentary funds because of residence abroad. Assignment does not amount to a ruling on the request or proof of harm.")
};

export function severityFor(record){
  const item=recordSeverity[typeof record==='string'?record:record.id];
  if(!item)return null;
  return {...severityBands.find(b=>b.id===item.band),reason:item.reason};
}

// Same-band cases are tied in gravity: newest documented update first, then stable ID.
export function compareCaseSeverity(a,b){
  return (severityFor(b)?.rank??0)-(severityFor(a)?.rank??0)
    ||b.updated.localeCompare(a.updated)
    ||a.id.localeCompare(b.id,'en');
}
