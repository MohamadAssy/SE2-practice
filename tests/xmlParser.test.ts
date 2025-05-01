import path from 'path';
import { parseXML } from '../src/parsers/xmlparser';

describe('XML Parser', () => {
  const filePath = path.join(__dirname, '../src/data/Cake orders.xml');

  it('should parse valid XML correctly', async () => {
    const result = await parseXML(filePath);
    expect(result).toHaveProperty('Orders');
    expect(Array.isArray(result.Orders.Order)).toBe(true);
  });

  it('should handle empty XML files', async () => {
    const emptyPath = path.join(__dirname, '../src/data/empty.xml');
    const result = await parseXML(emptyPath);
    expect(result).toEqual({});
  });

  it('should throw an error for malformed XML', async () => {
    const badPath = path.join(__dirname, '../src/data/malformed.xml');
    await expect(parseXML(badPath)).rejects.toThrow();
  });
});
