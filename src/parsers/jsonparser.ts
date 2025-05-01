import fs from 'fs/promises';
import { getSystemErrorMessage } from 'util';

export async function parseJSON(filePath: string): Promise<any> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    throw new Error(`Error parsing JSON: ${error.message}`);
  }
}
