/**
 * Utilities for working with Relay Global Object Identification
 */

/**
 * Converts a type name and database ID to a global Relay ID
 * 
 * @param type The type name (e.g., 'User', 'Tweet')
 * @param id The database ID 
 * @returns A base64-encoded global ID
 */
export function toGlobalId(type: string, id: number | string): string {
  return Buffer.from(`${type}:${id}`).toString('base64');
}

/**
 * Extracts the database ID and type from a global Relay ID
 * 
 * @param globalId The base64-encoded Relay ID
 * @returns An object containing the type and database ID
 */
export function fromGlobalId(globalId: string): { type: string; id: string } {
  try {
    const decoded = Buffer.from(globalId, 'base64').toString();
    const [type, id] = decoded.split(':');
    return { type, id };
  } catch (e) {
    console.error('Error decoding global ID:', e);
    return { type: 'Unknown', id: '0' };
  }
}

/**
 * Gets the numeric ID from a global Relay ID
 * 
 * @param globalId The base64-encoded Relay ID
 * @returns The numeric database ID
 */
export function getNumericId(globalId: string): number {
  const { id } = fromGlobalId(globalId);
  return parseInt(id, 10);
}