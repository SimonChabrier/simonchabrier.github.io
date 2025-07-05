import fs from 'fs/promises';
import fetch from 'node-fetch';

const API_URL = process.env.TRANSLATION_API_URL || 'https://traduction.simschab.cloud/translate';
const API_KEY = process.env.TRANSLATION_API_KEY || 'b5d889f372d98a0c5ebfc07f972c3cbb';

async function translateText(text, source = 'fr', target = 'en') {
  const payload = {
    q: text,
    source,
    target,
    format: 'html',
    alternatives: 1,
    secret: '',
  };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Translation failed: ${res.status}`);
  }
  const data = await res.json();
  return data.translatedText || text;
}

async function translateObject(obj) {
  if (Array.isArray(obj)) {
    const arr = [];
    for (const val of obj) arr.push(await translateObject(val));
    return arr;
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = await translateObject(v);
    }
    return result;
  }
  if (typeof obj === 'string') {
    return await translateText(obj);
  }
  return obj;
}

async function main() {
  const frData = JSON.parse(await fs.readFile('cv.json', 'utf8'));
  const enData = await translateObject(frData);
  await fs.writeFile('cv.en.json', JSON.stringify(enData, null, 2));
  console.log('English CV updated');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
