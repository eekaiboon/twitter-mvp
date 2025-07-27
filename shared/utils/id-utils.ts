/**
 * ID Utilities for Consistent ID Management
 * 
 * This module provides utilities for handling IDs consistently across the application.
 * It defines two primary ID types:
 * 
 * 1. DatabaseId: Raw numeric value used in the database
 * 2. GlobalId: Base64-encoded string containing type and ID information
 * 
 * The GlobalId format follows the Relay Global Object Identification specification:
 * https://relay.dev/graphql/objectidentification.htm
 */

/**
 * Valid entity types in the system. Update this when adding new entity types.
 */
export type EntityType = 'User' | 'Tweet' | 'Follow';

/**
 * Validates if a string is a valid entity type
 */
export function isValidEntityType(type: string): boolean {
  const validTypes: EntityType[] = ['User', 'Tweet', 'Follow'];
  return validTypes.includes(type as EntityType);
}

/**
 * Platform-agnostic ID utilities with placeholder implementations
 * that will be overridden by platform-specific implementations.
 */

/**
 * Encodes a string to base64 - must be implemented by platform-specific code
 */
export function encodeId(value: string): string {
  throw new Error('Platform-specific implementation required');
}

/**
 * Decodes a base64 string - must be implemented by platform-specific code
 */
export function decodeId(encoded: string): string {
  throw new Error('Platform-specific implementation required');
}

/**
 * Converts a database ID to a global ID for GraphQL
 */
export function toGlobalId(type: EntityType, id: number | string): string {
  const idStr = typeof id === 'number' ? String(id) : id;
  return encodeId(`${type}:${idStr}`);
}

/**
 * Parses a global ID back to its type and database ID components
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