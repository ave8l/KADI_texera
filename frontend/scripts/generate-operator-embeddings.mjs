// Generates the operator embedding index consumed by the semantic search.
// Run offline; the JSON it writes is committed so the app never needs an API key.
import { pipeline } from '@xenova/transformers';
import { readFileSync, writeFileSync } from 'fs';

const MODEL = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
const SRC = process.argv[2];
const OUT = process.argv[3];

const meta = JSON.parse(readFileSync(SRC, 'utf-8'));
const extractor = await pipeline('feature-extraction', MODEL);

const round = v => Math.round(v * 1e4) / 1e4;
const entries = [];
let n = 0;
for (const op of meta.operators) {
  const m = op.additionalMetadata;
  // Name, group and description all carry signal; the stock keyword search
  // only ever looked at the name.
  const text = `${m.userFriendlyName}. ${m.operatorGroupName}. ${m.operatorDescription ?? ''}`.trim();
  const out = await extractor(text, { pooling: 'mean', normalize: true });
  entries.push({
    operatorType: op.operatorType,
    name: m.userFriendlyName,
    group: m.operatorGroupName,
    description: m.operatorDescription ?? '',
    vector: Array.from(out.data).map(round),
  });
  if (++n % 40 === 0) console.log(`  ${n}/${meta.operators.length}`);
}

writeFileSync(OUT, JSON.stringify({ model: MODEL, dims: entries[0].vector.length, operators: entries }));
console.log(`${entries.length} operadores, ${entries[0].vector.length} dims -> ${OUT}`);
