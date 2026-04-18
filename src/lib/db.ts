import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db: Database | null = null;

export async function getDb() {
  if (db) return db;

  // Save DB alongside uploads so we only need to mount ONE persistent volume on Railway
  const dataDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  db = await open({
    filename: path.join(dataDir, 'aleena_memories.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert initial hardcoded data if empty
  const count = await db.get(`SELECT COUNT(*) as count FROM memories`);
  if (count.count === 0) {
    await db.exec(`
      INSERT INTO memories (title, description, date, imageUrl) VALUES
      ('The First Steps', 'From tiny steps to big dreams… you’ve always been magic. The world was so big, but your curiosity was bigger.', 'Age 2 • Summer ''08', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1j0Ejg--fmNswUnME2m2-oY3PSc5HsthB4d7Fcd6Ao-qNmO9Bxd5o7ZUb9AU3E7WWbt58I4gZ8nKnvAcw3VkthByThsre_SJHEGs3FWs5gvPfluIVqs_k4x_cAynrR3nyrTSmlpg7A019stFTXVm3UQ-DGL7KSApmGDrEId4InjCT_3rbDMVOd5WZw8dP7aa2Agji2LjdFLIUkvNYlzrpBMbbNhYah-6tF8x9RFo_YC70Qu2yxFMaAykvLMhmqpuJNwVhMBpBPgi5'),
      ('School Days', 'Backpacks larger than you, and a smile brighter than the morning sun. The beginning of a thousand questions.', 'Age 7 • Autumn ''13', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-F4jMghrbU_yanMChhaSwxH4XllOTfBHkrXzU4NEFnPJ5-fpU2NgaiEyiWvXLmsGg-GNI9HDdglUzs1IGaFHTMEbXW4kq0TIdqc9r7aW7k6tLXp_LFTyEqMLPXoyaJW9w6GWybx9MTe_4ruTF_Fvu7jcgfnwKYzlxZPoXPN6rzxcKvNxCE_8r-3hgJMIC032DLYDv9UlPc40VXcnqJvQc3cCM5mRO9jklms0Ih9duC7RRXHEssvc2mafgldy6eXbVFMS4y9fG_rAf')
    `);
  }

  return db;
}
