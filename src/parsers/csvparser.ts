// src/utils/parser.ts
import fs from 'fs';
import logger from '../util/logger';
import { ReadStream } from 'fs';

export const parseCSV = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const results: string[][] = [];

    const readStream: ReadStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

    let leftover = ''; // in case the chunk ends mid-line

    readStream.on('data', (chunk: string | Buffer) => {
      const text = typeof chunk === 'string' ? chunk : chunk.toString('utf-8');

      const lines = (leftover + text).split('\n');
      leftover = lines.pop() || ''; // keep the last line if it's not complete

      lines.forEach((line) => {
        const columns = line.split(',').map(value =>
          value.trim().replace(/^"(.*)"$/, '$1')
        );
        results.push(columns);
      });
    });

    readStream.on('end', () => {
      if (leftover) {
        const columns = leftover.split(',').map(value =>
          value.trim().replace(/^"(.*)"$/, '$1')
        );
        results.push(columns);
      }
      resolve(results);
    });

    readStream.on('error', (error) => {
      logger.error("Error while reading the stream of file %s, %o", filePath, error);
      reject(error);
    });
  });
};
