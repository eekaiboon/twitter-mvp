/**
 * ID utilities for consistent ID management across the application
 * 
 * This module provides utilities for handling IDs consistently using the 
 * Relay Global Object Identification specification.
 */
export type EntityType = 'User' | 'Tweet' | 'Follow';

export function isValidEntityType(type: string): boolean {
  const validTypes: EntityType[] = ['User', 'Tweet', 'Follow'];
  return validTypes.includes(type as EntityType);
}

/**
 * Backend implementation of encodeId using Node.js Buffer
 */
export function encodeId(value: string): string {
  return Buffer.from(value).toString('base64');
}

/**
 * Backend implementation of decodeId using Node.js Buffer
 */
export function decodeId(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString('utf-8');
}

/**
 * Converts a database ID to a global ID for GraphQL
 */
export function toGlobalId(type: EntityType, id: number | string): string {
  const idStr = typeof id === 'number' ? String(id) : id;
  return encodeId(`${type}:${idStr}`);
}

/**
 * Parses a global ID back to its type and database ID
 */
export function fromGlobalId(globalId: string): { type: EntityType; id: string } {
  try {
    const decoded = decodeId(globalId);
    const [type, id] = decoded.split(':');
    
    if (!type || !id || !isValidEntityType(type)) {
      throw new Error(`Invalid global ID format: ${globalId}`);
    }
    
    return { type: type as EntityType, id };
  } catch (error) {
    throw new Error(`Failed to decode global ID: ${error.message}`);
  }
}

/**
 * Extracts database ID as a number from a global ID
 */
export function extractDatabaseId(id: string | number): number {
  if (typeof id === 'number') {
    return id;
  }
  
  try {
    const { id: dbId } = fromGlobalId(id);
    const numId = Number(dbId);
    
    if (isNaN(numId)) {
      throw new Error(`Invalid numeric ID: ${dbId}`);
    }
    
    return numId;
  } catch (error) {
    // If it's not a valid global ID but is numeric, try direct conversion
    const numId = Number(id);
    if (!isNaN(numId)) {
      return numId;
    }
    throw new Error(`Unable to extract database ID from: ${id}`);
  }
}

/**
 * Checks if two IDs refer to the same entity, regardless of format
 */
export function idsMatch(id1: string | number, id2: string | number): boolean {
  // Normalize to strings for comparison
  const strId1 = String(id1);
  const strId2 = String(id2);
  
  // Direct string match
  if (strId1 === strId2) {
    return true;
  }
  
  // Try parsing as global IDs and compare database IDs
  try {
    const parsed1 = fromGlobalId(strId1);
    const parsed2 = fromGlobalId(strId2);
    return parsed1.id === parsed2.id;
  } catch {
    // If both aren't valid global IDs, try one-sided comparisons
    try {
      const parsed = fromGlobalId(strId1);
      return parsed.id === strId2;
    } catch {
      try {
        const parsed = fromGlobalId(strId2);
        return parsed.id === strId1;
      } catch {
        // Neither is a valid global ID and they don't match directly
        return false;
      }
    }
  }
}