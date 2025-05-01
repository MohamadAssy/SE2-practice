import fs from 'fs/promises';
import { getSystemErrorMessage } from 'util';
import { parseStringPromise } from 'xml2js';

export async function parseXML(filePath: string): Promise<any> {
  try {
    const xmlData = await fs.readFile(filePath, 'utf-8');
    const result = await parseStringPromise(xmlData, { explicitArray: false });
    return result;
  } catch (error: any) {
    throw new Error(`Error parsing XML: ${error.message}`);
  }
}
