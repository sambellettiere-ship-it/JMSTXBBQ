import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

// Use environment variable if provided, otherwise default to local 'data' directory
const dbDir = process.env.DB_PATH ? path.dirname(process.env.DB_PATH) : path.join(process.cwd(), 'data');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dbDir, 'sqlite.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    name TEXT NOT NULL,
    price TEXT,
    price2 TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`);

// Seed initial data if empty
const stmt = db.prepare('SELECT COUNT(*) as count FROM menu_items');
const hasItems = (stmt.get() as any).count > 0;

if (!hasItems) {
  const insertMenu = db.prepare(`
    INSERT INTO menu_items (section, name, price, price2, description, sort_order)
    VALUES (@section, @name, @price, @price2, @description, @sort_order)
  `);

  const initialMenu = [
    { section: 'plates', name: '1 Meat Plate', price: '$16', price2: null, description: null },
    { section: 'plates', name: '2 Meat Plate', price: '$20', price2: null, description: null },
    { section: 'plates', name: '3 Meat Plate', price: '$24', price2: null, description: null },
    { 
      section: 'feast', 
      name: 'Ultimate BBQ Feast', 
      price: '$76', 
      price2: null, 
      description: "Can't make the hard decisions or just don't want to? At JM's we say, \"DON'T\". Get all our meats and sides served to you on a huge platter.\n\nWarning: will feed 4 out of town visitors or 2 hungry FIGHTING ILLINI!" 
    },
    { section: 'sandwiches', name: 'Texas Dog', price: '$4', price2: null, description: null },
    { section: 'sandwiches', name: 'Pulled Pork', price: '$8', price2: null, description: null },
    { section: 'sandwiches', name: 'Turkey Breast', price: '$9', price2: null, description: null },
    { section: 'sandwiches', name: 'Chopped Brisket', price: '$10', price2: null, description: null },
    { section: 'meats', name: 'Brisket', price: '$15', price2: '$30', description: null },
    { section: 'meats', name: 'Sausage', price: '$8', price2: '$16', description: null },
    { section: 'meats', name: 'Pulled Pork', price: '$11', price2: '$22', description: null },
    { section: 'meats', name: 'Turkey Breast', price: '$12', price2: '$24', description: null },
    { section: 'sides', name: 'Potato Salad', price: '$6', price2: '$10', description: null },
    { section: 'sides', name: 'Cole Slaw', price: '$6', price2: '$10', description: null },
    { section: 'sides', name: 'Mac & Cheese', price: '$6', price2: '$10', description: null },
    { section: 'sides', name: 'Borracho Beans', price: '$6', price2: '$10', description: null },
    { section: 'dessert', name: 'Banana Cream Pudding', price: '$6', price2: null, description: null },
  ];

  db.transaction(() => {
    initialMenu.forEach((item, index) => {
      insertMenu.run({ ...item, sort_order: index });
    });
  })();
}

const hoursStmt = db.prepare('SELECT COUNT(*) as count FROM settings WHERE key LIKE \'hours_%\'');
const hasHours = (hoursStmt.get() as any).count > 0;

if (!hasHours) {
  const insertSetting = db.prepare(`INSERT INTO settings (key, value) VALUES (@key, @value)`);
  
  const defaultHours = [
    { key: 'hours_tuesday', value: '11 AM – 7 PM' },
    { key: 'hours_wednesday', value: '11 AM – 7 PM' },
    { key: 'hours_thursday', value: '11 AM – 7 PM' },
    { key: 'hours_friday', value: '11 AM – 7 PM' },
    { key: 'hours_saturday', value: '11 AM – 7 PM' },
    { key: 'hours_sunday_monday', value: 'Closed' },
  ];

  db.transaction(() => {
    defaultHours.forEach((item) => {
      insertSetting.run(item);
    });
  })();
}

export default db;
