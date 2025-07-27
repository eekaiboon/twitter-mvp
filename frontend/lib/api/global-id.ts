/**
 * Utility functions for handling Relay Global Object Identification Specification
 */

/**
 * Converts a type and ID to a base64-encoded global ID
 */
export function toGlobalId(type: string, id: string | number): string {
  const globalId = `${type}:${id}`;
  return Buffer.from(globalId).toString('base64');
}

/**
 * Extracts type and ID from a base64-encoded global ID
 */
export function fromGlobalId(globalId: string): [string, string] {
  const decoded = Buffer.from(globalId, 'base64').toString('utf-8');
  const [type, id] = decoded.split(':');
  return [type, id];
}