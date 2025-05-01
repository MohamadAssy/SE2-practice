import path from 'path';
import { parseJSON } from '../src/parsers/jsonparser';

describe('JSON Parser', () => {
  const filePath = path.join(__dirname, '../src/data/Cake orders.json');

  it('should parse valid JSON correctly', async () => {
    const result = await parseJSON(filePath);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('OrderID');
  });

  it('should handle empty JSON files', async () => {
    const emptyPath = path.join(__dirname, '../src/data/empty.json');
    const result = await parseJSON(emptyPath);
    expect(result).toEqual({});
  });

  it('should throw an error for malformed JSON', async () => {
    const badPath = path.join(__dirname, '../src/data/malformed.json');
    await expect(parseJSON(badPath)).rejects.toThrow();
  });
});
