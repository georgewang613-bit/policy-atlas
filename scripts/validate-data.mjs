import { readFileSync } from 'node:fs';
import { atlasSchema, date } from '../lib/atlas-schema.ts';
import { z } from 'zod/v4';

const read = name => JSON.parse(readFileSync(new URL(`../data/${name}`, import.meta.url), 'utf8'));
atlasSchema.parse(read('seed.json'));
const text = z.string().min(1);
const source = z.object({ url: z.string().url().refine(value => value.startsWith('https://')), publisher: text, locator: text });
const item = z.object({
  id: text, title: text, category: text, publishedAt: date.nullable(), version: text,
  status: text, checkedAt: date, conclusion: text, fact: text, liveUse: text,
  limits: text, nextStep: text, measure: text, sources: z.array(source).min(1),
});
z.object({ reviewedAt: date, items: z.array(item).min(1) }).superRefine((data, ctx) => {
  if (new Set(data.items.map(entry => entry.id)).size !== data.items.length) {
    ctx.addIssue({ code: 'custom', message: 'Duplicate technology IDs' });
  }
}).parse(read('technology.json'));
console.log('Policy and technology data passed validation. No files were changed.');
