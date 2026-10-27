import assert from 'node:assert/strict';
import {readFileSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import flavioTranslations from './translations/en.mjs';
import lulaTranslations from './translations/lula.en.mjs';

const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
for(const [person,source,output,hashes,translations] of [
  ['Flávio','./dist/data.json','./dist/data.en.json','./translations/en-source-hashes.json',flavioTranslations],
  ['Lula','./dist/data.lula.json','./dist/data.lula.en.json','./translations/lula-en-source-hashes.json',lulaTranslations]
]){
const original=read(source);
const reviewedHashes=read(hashes);
const hash=record=>createHash('sha256').update(JSON.stringify(record)).digest('hex');
assert.equal(Object.keys(translations).length,original.length,'English translation count does not match the archive');
assert.equal(Object.keys(reviewedHashes).length,original.length,'English source review count does not match the archive');
const english=original.map(record=>{
  const translated=translations[record.id];
  assert.ok(translated,`Missing English record: ${record.id}`);
  assert.equal(reviewedHashes[record.id],hash(record),`Portuguese source changed: review the English translation and its source hash for ${record.id}`);
  for(const key of ['title','court','status','role','summary','details','defense','limit'])assert.ok(typeof translated[key]==='string'&&translated[key].trim(),`${record.id}: missing English ${key}`);
  for(const key of Object.keys(translated))assert.ok(['title','court','status','role','identifier','summary','details','defense','limit','events','sources'].includes(key),`${record.id}: translation cannot override ${key}`);
  assert.equal(translated.events.length,record.events.length,`${record.id}: event count mismatch`);
  assert.equal(translated.sources.length,record.sources.length,`${record.id}: source count mismatch`);
  return {...record,...translated,
    category:({Criminal:'Criminal',Eleitoral:'Electoral','Cível':'Civil',Parlamentar:'Parliamentary'})[record.category],
    events:record.events.map((event,i)=>{
      const t=translated.events[i];
      assert.deepEqual(Object.keys(t).sort(),['text','title']);
      assert.ok(t.title&&t.text,`${record.id}: incomplete English event`);
      return {...event,...t};
    }),
    sources:record.sources.map((source,i)=>{
      const t=translated.sources[i];
      assert.deepEqual(Object.keys(t).sort(),['note','title']);
      assert.ok(t.title,`${record.id}: missing English source label`);
      assert.equal(Boolean(t.note),Boolean(source.note),`${record.id}: source note omitted`);
      return {...source,...t};
    })
  };
});
writeFileSync(new URL(output,import.meta.url),JSON.stringify(english,null,2)+'\n');
console.log(`${person} / English: ${english.length} translated records; dates, IDs and source links preserved.`);

}
