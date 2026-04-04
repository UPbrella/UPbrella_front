import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const CSV_PATH = resolve(ROOT, "translations.csv");
const OUT_DIR = resolve(ROOT, "src/shared/lib/i18n/locales");

function parseCSV(raw: string): { key: string; ko: string; en: string }[] {
  const lines = raw.split("\n").filter((l) => l.trim());
  const [headerLine, ...dataLines] = lines;

  const headers = parseCSVLine(headerLine);
  const keyIdx = headers.indexOf("key");
  const koIdx = headers.indexOf("ko");
  const enIdx = headers.indexOf("en");

  if (keyIdx === -1 || koIdx === -1 || enIdx === -1) {
    throw new Error(`CSV must have "key", "ko", "en" columns. Found: ${headers.join(", ")}`);
  }

  return dataLines.map((line, lineNum) => {
    const cols = parseCSVLine(line);
    if (cols.length < 3) {
      throw new Error(`Line ${lineNum + 2}: expected at least 3 columns, got ${cols.length}`);
    }
    return { key: cols[keyIdx], ko: cols[koIdx], en: cols[enIdx] };
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === "\\" && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

function resolveUnicodeEscapes(s: string): string {
  return s.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function buildJSON(rows: { key: string; ko: string; en: string }[], lang: "ko" | "en") {
  const obj: Record<string, string> = {};
  for (const row of rows) {
    const value = resolveUnicodeEscapes(row[lang]);
    if (value) {
      obj[row.key] = value;
    }
  }
  return obj;
}

const raw = readFileSync(CSV_PATH, "utf-8");
const rows = parseCSV(raw);

mkdirSync(OUT_DIR, { recursive: true });

const koJSON = buildJSON(rows, "ko");
const enJSON = buildJSON(rows, "en");

writeFileSync(resolve(OUT_DIR, "ko.json"), JSON.stringify(koJSON, null, 2) + "\n", "utf-8");
writeFileSync(resolve(OUT_DIR, "en.json"), JSON.stringify(enJSON, null, 2) + "\n", "utf-8");
