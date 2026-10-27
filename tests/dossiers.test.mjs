import assert from 'node:assert/strict';
import test from 'node:test';
import {readRoute,personUrl,dossiers} from '../dist/dossiers.mjs';

test('old Flávio links and names mentioning Lula retain their subject',()=>{
  assert.deepEqual(readRoute(new URL('https://obpub.org/en/#caso=calunia-lula')),{person:'flavio',caseId:'calunia-lula'});
  assert.equal(readRoute(new URL('https://obpub.org/#caso=rachadinhas-alerj')).person,'flavio');
});
test('Lula deep links restore their dossier in both languages',()=>{
  for(const path of ['/','/en/']){
    assert.equal(readRoute(new URL('https://obpub.org'+path+'?pessoa=lula')).person,'lula');
    assert.equal(readRoute(new URL('https://obpub.org'+path+'#caso=lula-triplex')).person,'lula');
  }
});
test('switching subjects clears a stale case without losing language or unrelated parameters',()=>{
  const url=personUrl('https://obpub.org/en/?pessoa=lula&ref=bookmark#caso=lula-triplex','flavio');
  assert.equal(url.href,'https://obpub.org/en/?ref=bookmark');
  assert.equal(personUrl(url,'lula').href,'https://obpub.org/en/?ref=bookmark&pessoa=lula');
});
test('unknown person and malformed hash fall back safely',()=>{
  assert.deepEqual(readRoute(new URL('https://obpub.org/?pessoa=unknown#caso=%E0')),{person:'flavio',caseId:null});
});
test('every subject uses separate Portuguese and English archives',()=>{
  assert.equal(new Set(Object.values(dossiers).flatMap(d=>Object.values(d.files))).size,4);
});
