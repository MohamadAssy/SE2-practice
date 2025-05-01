import path from 'path';
import { parseCSV } from '../src/parsers/csvparser';

describe('CSV Parser', () => {
  const filePath = path.join(__dirname, '../src/data/Cake orders.csv');

  it('should parse valid CSV correctly', async () => {
    const result = await parseCSV(filePath);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toEqual(['OrderID', 'Product', 'Quantity', 'Price']);
  });

  it('should handle empty CSV files', async () => {
    const emptyPath = path.join(__dirname, '../src/data/empty.csv');
    const result = await parseCSV(emptyPath);
    expect(result).toEqual([]);
  });

  it('should throw an error on invalid CSV file path', async () => {
    await expect(parseCSV('invalid/path.csv')).rejects.toThrow();
  });
});
