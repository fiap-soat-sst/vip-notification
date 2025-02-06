import fs from 'fs';
import path from 'path';

export function loadTemplate(templatePath: string): string {
  return fs.readFileSync(path.join(__dirname, templatePath), 'utf8');
}