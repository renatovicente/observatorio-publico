// Editorial English translations. IDs, dates, URLs and publishers come from the Portuguese dataset.
const E=(title,text)=>({title,text});
const S=(title,note='')=>({title,note});
const unknown='No subsequent outcome was confirmed in the sources consulted. The date refers to the latest record located, not a full review of the case file.';
const noDefense='No specific response from the defense to this decision was found in the sources consulted.';
const records={};
const add=(id,record)=>{records[id]=record;};

add('rachadinhas-alerj',{
 title:'Alleged salary kickbacks in the Alerj office',court:'MPRJ · TJ-RJ · STJ · STF',
 status:'Criminal complaint rejected in 2022',role:'Named in a criminal complaint; complaint not accepted by the court',
 identifier:'PIC MPRJ 2018.00452470 · STF HC 201.965 / Rcl 41.910',
 summary:'Rio de Janeiro prosecutors accused Flávio of participating in the diversion of staff salaries. The criminal complaint was rejected after evidence was invalidated; a request to reopen the case was reported in September 2026.',
 details:'The case concerns suspected embezzlement and money laundering, including real estate transactions and a chocolate shop. In 2021, the STJ and STF invalidated evidence. The TJ-RJ rejected the criminal complaint for lack of sufficient grounds in 2022. Prosecutors’ appeals were denied in 2025. On 29 September 2026, Folha reported a new request by Grupo Prerrogativas, filed by Rui Falcão, based on bank safe deposit box records.',
 defense:'Flávio denies wrongdoing. His defense considered the case closed after the complaint was rejected and described the 2025 ruling as technically sound and correct.',
 limit:'The September request does not establish that the case was reopened. The rejected complaint was not adjudicated on its merits. The properties and shop form part of this factual context and are not counted here as separate crimes.',
 events:[E('Reports invalidated','The STF’s Second Panel invalidated four Coaf financial intelligence reports.'),E('Criminal complaint rejected','The TJ-RJ terminated the proceedings after the evidence was invalidated.'),E('Appeals denied','Gilmar Mendes rejected the prosecution’s appeals.'),E('New request reported','A petition sought to resume the case; approval was not confirmed.')],
 sources:[S('STF explains the invalidation of financial reports and the jurisdiction ruling'),S('TJ-RJ rejects the criminal complaint after evidence is invalidated'),S('STF rejects appeals by Rio de Janeiro prosecutors'),S('Prerrogativas asks Rio de Janeiro prosecutors to reopen the case')]
});
add('dark-horse',{
 title:'Financing of the film Dark Horse',court:'STF · Federal Police',status:'Investigation confirmed',role:'Under investigation',identifier:'Petition linked to Inquiry 5.026',
 summary:'The Federal Police are investigating possible irregularities in Daniel Vorcaro’s financing of the Jair Bolsonaro biopic. Flávio’s inclusion as a subject of investigation was authorized in July 2026.',
 details:'The investigation concerns suspected money laundering, unlawful transfers of funds abroad and corruption. André Mendonça’s authorization, supported by the Prosecutor General’s Office (PGR), became public in September. In October, the Federal Police requested another 90 days for analysis and international cooperation.',
 defense:'Flávio acknowledged seeking funding for the film and says the financing was private and lawful.',
 limit:'A request for an extension does not mean it was granted. No conviction was located. The separate examination of parliamentary budget allocations related to the production company should not automatically be conflated with this inquiry.',
 events:[E('Investigation authorized','Flávio was expressly included, according to the documents described in news reports.'),E('Extension requested','The Federal Police requested 90 additional days, according to a report published on 16 October.')],
 sources:[S('Flávio included as a subject of investigation in the Dark Horse case'),S('Authorization of the investigation and the senator’s response'),S('Federal Police request an extension and analysis of transfers abroad')]
});
add('willer-tomaz',{
 title:'Relationship with Willer Tomaz and company accounts',court:'STF · Federal Police',status:'Investigation with interim restrictions',role:'Under investigation',identifier:'Sealed inquiry; number not confirmed',
 summary:'An inquiry separate from Dark Horse is examining suspected money laundering and unlawful transfers of funds abroad. On 26 October 2026, CNN reported travel restrictions and a ban on contact with Willer Tomaz.',
 details:'The inquiry arose from an investigation into payments and betting in Rio Grande do Sul. According to news reports, the Federal Police are examining whether Flávio held an economic interest in companies linked to Tomaz. CNN reported that Moraes ordered the cancellation of his Brazilian passport and the surrender of travel documents issued by other countries.',
 defense:'Flávio denies holding a joint account or an ownership stake. His defense says a database entry linking him to a company was incorrect and was being corrected. He said he would comply with the order, while criticizing it. Tomaz also denies wrongdoing.',
 limit:'The interim measures are described by the press on the basis of a sealed decision. They do not constitute a conviction. Tomaz’s involvement in another investigation concerning the INSS does not automatically make Flávio a subject of that inquiry.',
 events:[E('Case assigned at the STF','According to CNN, the case was assigned to Alexandre de Moraes.'),E('Interim restrictions reported','Restrictions on travel documents and a ban on contact with Tomaz.')],
 sources:[S('Federal Police examine a possible economic link with Willer Tomaz'),S('Moraes orders restrictions on travel and contact'),S('Context of the betting investigation and the defense responses'),S('Flávio’s response to the demand for his passports')]
});
add('cpi-pandemia',{
 title:'Follow-up to the parliamentary COVID-19 inquiry',court:'STF · Federal Police',status:'Inquiry opened; outcome not located',role:'Under investigation / expressly named respondent',identifier:'STF Petition 10.064/DF',
 summary:'In September 2025, the STF ordered an inquiry into matters covered by the parliamentary COVID-19 inquiry report. Flávio is expressly named in the decision alongside other respondents.',
 details:'On 17 September 2025, Flávio Dino converted the petition into a sealed police inquiry with an initial 60-day deadline. In 2021, the parliamentary committee had recommended that Flávio be formally accused of incitement to crime. That recommendation is not equivalent to a criminal complaint accepted by a court.',
 defense:'Flávio criticized the committee’s report as political, weak and unconstitutional. This response concerns the 2021 report.',
 limit:'The opening decision does not specify every individual’s alleged conduct. We do not attribute to Flávio all offenses broadly mentioned in the inquiry. No subsequent outcome was confirmed.',
 events:[E('Inquiry ordered','The decision converted Petition 10.064 into a police investigation.')],
 sources:[S('STF orders an inquiry into the parliamentary committee’s findings'),S('Decision in Petition 10.064, including the list of respondents','PDF'),S('Flávio’s response to the parliamentary inquiry report')]
});
add('calunia-lula',{
 title:'Posts about Lula: investigation into false criminal allegations',court:'STF · Federal Police · PGR',status:'Police report; no final ruling located',role:'Under investigation',
 summary:'In June 2026, the Federal Police concluded that Flávio’s posts could constitute calúnia, the offense of falsely accusing someone of a crime, against Lula. In July, the defense submitted explanations and the case returned to the Prosecutor General’s Office.',
 details:'The investigation concerns posts from January 2026. A police conclusion that an offense occurred is not a conviction. On 28 July, Moraes sent the case back to the PGR for its position following written explanations.',
 defense:'The defense argues that the posts were political commentary and predictions about the future, and that the reference to crimes concerned Nicolás Maduro, without a specific false accusation against Lula.',
 limit:'This review did not confirm that a court had accepted a criminal complaint or issued a final judgment.',
 events:[E('Police findings reported','The report identified possible false criminal allegations.'),E('Defense explanations submitted','The case was sent back to the PGR.')],
 sources:[S('Federal Police conclude investigation into posts and false criminal allegations'),S('Defense submits explanations in the case concerning false criminal allegations')]
});
add('furna-acareacao',{
 title:'Furna da Onça: failure to attend a confrontation hearing',court:'Prosecutor General’s Office (PGR)',status:'Complaint closed',role:'Subject of a complaint alleging disobedience',
 summary:'The PGR closed a complaint alleging disobedience after Flávio failed to attend a confrontation hearing with Paulo Marinho.',
 details:'The hearing formed part of the inquiry into a possible leak concerning Operation Furna da Onça. The PGR concluded that Flávio, who was being heard as a witness, was entitled to arrange the date of his testimony.',
 defense:'The accepted rationale was his right to arrange the hearing date in his capacity as a witness.',
 limit:'The closure concerns the complaint about his absence. It is not a judgment on all facts relating to Operation Furna da Onça.',
 events:[E('Complaint closed','The PGR dismissed the allegation of disobedience in this episode.')],
 sources:[S('PGR closes complaint over failure to attend confrontation hearing')]
});
add('imoveis-especie',{
 title:'Request to investigate property purchases in cash',court:'STF',status:'Investigation request dismissed',role:'Subject of a dismissed request for investigation',
 summary:'André Mendonça dismissed a request to investigate Jair Bolsonaro and his sons, including Flávio, over property purchases in cash, citing insufficient indications of wrongdoing.',
 details:'Congressman Reginaldo Lopes requested an inquiry. The decision published on 20 November 2023 rejected the request for lack of sufficient supporting elements. The news report identifies Flávio among the sons involved in the purchases being questioned.',
 defense:'The favorable ruling cited insufficient grounds to open an investigation. No additional individual statement by Flávio was found in this source.',
 limit:'The property survey covers several family members. We do not attribute all purchases mentioned in the coverage to Flávio.',
 events:[E('Request dismissed','The STF found insufficient indications to open an investigation.')],
 sources:[S('Mendonça dismisses request concerning properties bought in cash')]
});
add('etica-2024',{
 title:'Ethics Council: office staff, Abin and the tax authority',court:'Senate · Ethics Council',status:'Complaint ready to be placed on the agenda',role:'Respondent',identifier:'REP 1/2024 · originating from PCE 1/2020',
 summary:'A disciplinary complaint concerns episodes involving his former office and alleged interference in investigations. The Senate portal lists it as ready to be placed on the agenda.',
 details:'The Council admitted the proceedings in July 2024. The rapporteur, Dr. Hiran, submitted a preliminary report on 26 August 2025. The case history consulted does not record a final judgment.',
 defense:'The preliminary defense requested summary dismissal and disputed the grounds of the complaint.',
 limit:'The rapporteur’s opinion is not a decision by the Council. These are disciplinary proceedings, not a criminal conviction.',
 events:[E('Proceedings admitted','The complaint began proceeding before the Council.'),E('Report submitted','The matter was listed as ready to be placed on the agenda.')],
 sources:[S('Case history of Complaint 1/2024'),S('Council admits proceedings against senators'),S('Flávio’s preliminary defense in REP 1/2024','Defense submission, not a ruling')]
});

const petitions=[
 [6,'Ethics: PSOL and Rede request concerning Dark Horse','PSOL and Rede requested a disciplinary inquiry into dealings with Daniel Vorcaro to finance the film. An amendment was added to the petition in September.','The official case history records the petition and its amendment; no admission decision or ruling on the merits was located.'],
 [7,'Ethics: Partido Missão request concerning Dark Horse','Partido Missão requested proceedings over an alleged breach of parliamentary decorum in negotiations about financing the film.','This is a separate petition concerning the same financing-related facts. No decision admitting it was located.'],
 [11,'Ethics: AI video and presidential convention','A petition by Fábio de Oliveira Ribeiro questions an AI-generated video of Jair Bolsonaro and international participation in Flávio’s convention.','These objections were raised by the petitioner. The official case history does not record a judgment on their substance.'],
 [14,'Ethics: accounts of Vorcaro’s payments','The Workers’ Party (PT) challenges Flávio’s statements about when payments for Dark Horse ended.','The allegation of inconsistency comes from the petitioning party; it is not a finding by the Ethics Council.'],
 [22,'Ethics: Dark Horse and ties to Willer Tomaz','Randolfe Rodrigues and seven other senators requested an inquiry into the film and alleged benefits and financial ties involving Vorcaro and Willer Tomaz.','The petition was added to the record on 21 October 2026. The official page lists it as awaiting the appointment of committee members.']
];
for(const [num,title,summary,details] of petitions)add(`etica-pce-${num}-2026`,{
 title,summary,details,court:'Senate · Ethics Council',status:'Petition; admission not confirmed',role:'Subject of a request for disciplinary proceedings',identifier:`PCE ${num}/2026`,
 defense:'No specific defense response to this petition was found in the sources examined.',
 limit:'A request to open proceedings is not an admitted disciplinary case. The five petitions from 2026 partly overlap and do not represent five crimes.',
 events:[E('Petition added to the record','Request registered with the Ethics Council.'),...(num===6?[E('Amendment added to the record','The petitioners added material to the petition.')]:[])],
 sources:[S(`Official case history of PCE ${num}/2026`),num===22?S('Reproduction of the text of PCE 22/2026','Document reproduction; not a Senate webpage'):S('Context of the disciplinary petitions submitted in 2026')]
});

add('rede-collabs',{
 title:'Profile network and promotion in the 2026 election',court:'Superior Electoral Court (TSE)',status:'Electoral proceedings under investigation',role:'Subject of an electoral judicial investigation (AIJE)',
 summary:'The TSE admitted an inquiry into an alleged coordinated network of profiles used to increase the reach of candidates and requested digital data.',
 details:'The opposing electoral coalition alleges a lack of accounting transparency and possible use of parliamentary office resources. Orders required Facebook to preserve and provide data and Shopee to provide commercial information.',
 defense:'The defense maintains that the sharing was voluntary, organic and lawful.',
 limit:'Admission of the case and investigative measures do not establish electoral abuse. No judgment on the merits was located.',
 events:[E('Proceedings and investigative steps reported','The TSE requested information on profiles and sales.')],
 sources:[S('TSE examines a profile network and online promotion'),S('Electoral Inspector General requests data from Facebook and Shopee')]
});
add('ia-publicacoes-maio',{
 title:'AI posts and claims linking Lula to criminal groups',court:'Superior Electoral Court (TSE)',status:'Removal of posts ordered',role:'Respondent',identifier:'Rp 0600955-65.2026.6.00.0000',
 summary:'The TSE ordered the removal of three posts from May 2026: one used AI without disclosure and two linked Lula to criminal organizations.',
 details:'The unanimous decision upheld removal and prohibited republication. The court cited the failure to identify AI-generated material and the lack of sufficient factual grounds for the claimed links.',
 defense:noDefense,
 limit:'This is an electoral ruling about content. It is not a criminal conviction and concerns a different episode from the video posted in June.',
 events:[E('Removal ordered','The TSE ruled on three posts from 30 and 31 May 2026.')],
 sources:[S('Ruling on AI videos and claims of links to criminal groups')]
});
const electoral=[
 ['video-faccoes-junho','June video linking Lula to the PCC and CV','R$5,000 electoral fine','The TSE imposed a R$5,000 fine over a video posted on 3 June 2026 that linked Lula to the PCC and Comando Vermelho.','This episode is separate from the three May posts examined in another complaint.',noDefense],
 ['celso-daniel','Sharing an interview about Celso Daniel','R$10,000 electoral fine','The TSE fined Flávio for sharing an interview that linked Lula and the Workers’ Party (PT) to the murder of Celso Daniel.','The decision was reached by a majority.','A dissenting vote would have excluded Flávio from the sanction on the grounds that he had shared the interview. No additional defense response was located.'],
 ['satanismo-2024','Video linking Lula to Satanism','R$30,000 electoral fine','The TSE fined Flávio for disseminating a video that linked Lula to Satanism during the 2022 elections.','The individual fine reported was R$30,000.','The defense disagreed with the ruling and announced an appeal.'],
 ['video-mei','Video of Lula speaking about individual microentrepreneurs','Electoral fine upheld','The TSE upheld an individual R$30,000 fine for disseminating a video that distorted Lula’s remarks about individual microentrepreneurs.','The decision also ordered the permanent removal of the content, which originated from a debate in October 2022.','The appeal against the sanction was rejected. Additional defense arguments were not confirmed for this record.'],
 ['aposentados-2023','Video about financial losses to pensioners','R$15,000 electoral fine upheld','The TSE upheld a R$15,000 fine and the removal of a video that attributed financial losses suffered by pensioners to the Workers’ Party (PT).','The case arose from content circulated during the 2022 election.','The defense appealed; a majority of the court upheld the sanction.'],
 ['video-demonio','Edited remarks by Lula about the “devil”','R$5,000 electoral fine','The TSE fined Flávio for disseminating an edited excerpt that linked Lula to the devil, changing the meaning of his remarks.','In the original remarks, Lula denied the association. The decision was reported after deliberations ended on 5 May 2023.',noDefense],
 ['video-nikolas','Sharing the “faz o L” video','Electoral fine imposed','The TSE fined Flávio and others who shared a video by Nikolas Ferreira making accusations against Lula during the 2022 campaign.','The complaint challenged allegations concerning encouragement of crime, drugs and censorship.',noDefense]
];
for(const [id,title,status,summary,details,defense] of electoral)add(id,{
 title,status,summary,details,defense,court:'Superior Electoral Court (TSE)',role:'Respondent; electoral sanction',
 limit:'An electoral sanction, not a criminal conviction. '+unknown,
 events:[E('Electoral ruling located',status+'.')],
 sources:[S(title+' — ruling and context'),...(id==='satanismo-2024'?[S('Ruling on the Satanism video and the defense response')]:[])]
});
add('chico-buarque',{
 title:'Use of Chico Buarque’s album cover',court:'Rio de Janeiro Court of Justice',status:'Civil judgment reversed on appeal',role:'Defendant in a civil case',
 summary:'An appellate panel overturned the order requiring Flávio to pay R$48,000 over an edited image using a Chico Buarque album cover.',
 details:'The episode occurred during the 2022 campaign. The reversal was reported in April 2024; the musician’s lawyer announced an appeal.',
 defense:'The defense argued that the image was political commentary without an offensive purpose. The panel found no direct damage or proven authorship of the meme.',
 limit:unknown,
 events:[E('Reversal of the judgment reported','The damages awarded at first instance were set aside.')],
 sources:[S('Appellate panel overturns damages award to Chico Buarque')]
});
add('fotografa',{
 title:'Use of a photograph by Ana Carolina Fernandes',court:'3rd Civil Court of Rio de Janeiro',status:'Civil judgment at first instance',role:'Defendant in a civil case',
 summary:'A first-instance court ordered Flávio to pay R$15,000 for using a photograph without authorization and for a purpose other than its intended one.',
 details:'The judgment, dated 11 March 2024, concerned a photograph of a demonstration. The news report stated that the ruling could be appealed.',
 defense:'UOL reported that it had contacted the defense but received no response before publication.',
 limit:'No appeal outcome was confirmed. The report mentions a separate sealed case brought by the family pictured; its details were not included.',
 events:[E('Civil judgment','Damages of R$15,000 were awarded at first instance.')],
 sources:[S('Civil judgment over the use of a photograph')]
});
add('declaracao-bens-2014',{
 title:'Asset declaration in the 2014 election',court:'Rio de Janeiro Regional Electoral Court (TRE-RJ)',status:'Inquiry terminated by court order',role:'Investigated for possible false electoral declarations',identifier:'Inquiry 0600122-62.2021.6.19.0204',
 summary:'The TRE-RJ terminated an investigation into alleged false statements in the 2014 asset declaration because it had taken too long.',
 details:'The investigation began in May 2018. The Federal Police and electoral prosecutors requested its closure before the habeas corpus petition was decided.',
 defense:'The defense obtained the habeas corpus order terminating the inquiry.',
 limit:'The reported ground was the excessive duration of the investigation. The news item is dated 23 May 2023; a technical update to the webpage in 2025 does not represent a new ruling.',
 events:[E('Habeas corpus granted','The TRE-RJ ordered the inquiry terminated.')],
 sources:[S('TRE-RJ grants habeas corpus concerning the asset declaration')]
});
add('santini-contas',{
 title:'Payment claim by the former chocolate shop partner',court:'Federal District Court of Justice',status:'Payment claim reported; outcome unconfirmed',role:'Defendant in a civil payment claim',
 summary:'Alexandre Santini filed a R$1.47 million payment claim against Flávio, alleging unequal profit sharing and unreimbursed payments in their chocolate shop partnership.',
 details:'According to the report, Santini filed the case in November 2023. The financial allegations come from the former partner; no ruling on the merits of this claim was located.',
 defense:'Estadão contacted Flávio, who had not responded by the time the report consulted was published.',
 limit:'The outcome and case number were not confirmed. The dismissal of a separate action brought by Flávio to demand an accounting does not decide Santini’s payment claim.',
 events:[E('Payment claim reported','The report records a lawsuit filed by the former partner in November 2023; the exact filing date was not confirmed.')],
 sources:[S('Report records Santini’s payment claim against Flávio','The same article covers a separate case initiated by Flávio.')]
});

export default records;
