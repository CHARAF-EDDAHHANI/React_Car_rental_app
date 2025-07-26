// Read & Write JSON files using fs/promises
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct absolute paths
const paths = {
  buyers: path.join(__dirname, '../db_storage/buyers.json'),
  sellers: path.join(__dirname, '../db_storage/sellers.json'),
  orders: path.join(__dirname, '../db_storage/orders.json'),
  cars: path.join(__dirname, '../db_storage/cars.json'),
};

// Read JSON file
export const readJSON = async (fileKey) => {
  const filePath = paths[fileKey];
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Error reading ${fileKey} JSON:`, err.message);
    return [];
  }
};

// Write JSON file
export const writeJSON = async (fileKey, data) => {
  const filePath = paths[fileKey];
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${fileKey} JSON:`, err.message);
  }
};

export const jsonPaths = paths;