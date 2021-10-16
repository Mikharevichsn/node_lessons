import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const adapter = new JSONFile(path.join(__dirname, 'db.json'));
const db = new Low(adapter);

await db.read();

export default db;
