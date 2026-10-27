import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {caseDisposition,countedCases} from '../dist/case-status.mjs';

const read=name=>JSON.parse(readFileSync(new URL('../dist/'+name,import.meta.url)));
const records=[...read('data.json'),...read('data.lula.json')];
const record=id=>records.find(r=>r.id===id);

test('annulled convictions, prescription and acquittals are excluded from the public view and counts',()=>{
  for(const id of ['lula-triplex-guaruja','lula-sitio-atibaia','lula-zelotes-mp471','lula-obstrucao-cervero']){
    assert.equal(caseDisposition(record(id)),'closed',id);
    assert.equal(countedCases([record(id)]).length,0,id);
  }
});
test('a reversed civil judgment is excluded even though its general filter is decision',()=>{
  assert.equal(record('chico-buarque').state,'decisao');
  assert.equal(caseDisposition(record('chico-buarque')),'closed');
  assert.equal(countedCases([record('chico-buarque')]).length,0);
});
test('pending investigations and standing sanctions are visible and counted',()=>{
  for(const id of ['dark-horse','lula-mensagens-govbr-2026','fotografa','lula-primeiro-maio-boulos-2024']){
    assert.equal(caseDisposition(record(id)),'open',id);
    assert.equal(countedCases([record(id)]).length,1,id);
  }
});
test('unadmitted petitions and requests to reopen do not become open investigations',()=>{
  assert.equal(caseDisposition(record('etica-pce-6-2026')),'pending');
  assert.equal(caseDisposition(record('rachadinhas-alerj')),'closed');
  assert.equal(countedCases([record('etica-pce-6-2026'),record('rachadinhas-alerj')]).length,0);
});

test('visible records exclude all closed outcomes and unadmitted requests',()=>{
  const visible=countedCases(records);
  assert.ok(visible.every(r=>!['encerrado','pedido'].includes(r.state)));
  assert.ok(!visible.some(r=>r.id==='chico-buarque'));
});
