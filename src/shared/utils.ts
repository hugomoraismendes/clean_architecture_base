import { randomUUID } from 'crypto';

export function snakeToCamel(str: string) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
}

export function generateUuidV4(): string {
  return randomUUID();
}
