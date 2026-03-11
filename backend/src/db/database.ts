import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(__dirname, '../../quiz_results.json');

interface QuizResultRecord {
  id: number;
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  emotionalStability: number;
  dominantTrait: string;
  motivationType: string;
  createdAt: string;
}

interface Store {
  results: QuizResultRecord[];
  nextId: number;
}

function readStore(): Store {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')) as Store;
    }
  } catch {
    // ignore read errors, start fresh
  }
  return { results: [], nextId: 1 };
}

function writeStore(store: Store): void {
  fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export function insertQuizResult(data: Omit<QuizResultRecord, 'id' | 'createdAt'>): number {
  const store = readStore();
  const record: QuizResultRecord = {
    id: store.nextId,
    ...data,
    createdAt: new Date().toISOString(),
  };
  store.results.push(record);
  store.nextId++;
  writeStore(store);
  return record.id;
}
