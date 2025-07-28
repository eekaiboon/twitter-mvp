'use client';

/**
 * Frontend implementation of ID utilities
 * 
 * This module provides browser-specific implementations of ID utilities
 * for handling global IDs in the application
 */

/**
 * Valid entity types in the system
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
 * Frontend implementation of encodeId using browser's btoa
 */
export function encodeId(value: string): string {
  return btoa(value);
}

/**
 * Frontend implementation of decodeId using browser's atob
 */
export function decodeId(encoded: string): string {
  return atob(encoded);
}

/**
 * Converts a database ID to a global ID for GraphQL
 */
export function toGlobalId(type: EntityType, id: number | string): string {
  const idStr = typeof id === 'number' ? String(id) : id;
  const globalId = encodeId(`${type}:${idStr}`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[ID] Created global ID:', { type, id, globalId });
  }
  
  return globalId;
}

/**
 * Parses a global ID back to its type and database ID
 */
export function fromGlobalId(globalId: string): { type: EntityType; id: string } {
  // Special case handling
  if (globalId === 'current-user') {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ID] Special case: current-user');
    }
    return { type: 'User', id: 'current-user' };
  }
  
  try {
    const decoded = decodeId(globalId);
    const [type, id] = decoded.split(':');
    
    if (!type || !id) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[ID] Invalid global ID format:', globalId);
      }
      return { type: 'Unknown' as EntityType, id: globalId };
    }
    
    if (!isValidEntityType(type)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[ID] Unknown entity type in global ID:', { globalId, type });
      }
      return { type: 'Unknown' as EntityType, id };
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ID] Parsed global ID:', { globalId, type, id });
    }
    
    return { type: type as EntityType, id };
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[ID] Failed to decode global ID:', { globalId, error });
    }
    return { type: 'Unknown' as EntityType, id: globalId };
  }
}

/**
 * Checks if two IDs refer to the same entity, regardless of format
 */
export function idsMatch(id1: string | number | null | undefined, id2: string | number | null | undefined): boolean {
  // Handle null/undefined values
  if (id1 == null || id2 == null) {
    return false;
  }
  
  // Normalize to strings for comparison
  const strId1 = String(id1);
  const strId2 = String(id2);
  
  // Direct string match
  if (strId1 === strId2) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ID] Direct match:', { id1: strId1, id2: strId2 });
    }
    return true;
  }
  
  // Try parsing as global IDs and compare database IDs
  try {
    const parsed1 = fromGlobalId(strId1);
    const parsed2 = fromGlobalId(strId2);
    const result = parsed1.id === parsed2.id;
    
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ID] Comparing parsed IDs:', { 
        id1: strId1, 
        id2: strId2, 
        parsed1, 
        parsed2, 
        match: result 
      });
    }
    
    return result;
  } catch {
    // If both aren't valid global IDs, try one-sided comparisons
    try {
      const parsed = fromGlobalId(strId1);
      const result = parsed.id === strId2;
      
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ID] Comparing parsed id1 with id2:', { parsed, id2: strId2, match: result });
      }
      
      return result;
    } catch {
      try {
        const parsed = fromGlobalId(strId2);
        const result = parsed.id === strId1;
        
        if (process.env.NODE_ENV !== 'production') {
          console.debug('[ID] Comparing id1 with parsed id2:', { id1: strId1, parsed, match: result });
        }
        
        return result;
      } catch {
        if (process.env.NODE_ENV !== 'production') {
          console.debug('[ID] No match found:', { id1: strId1, id2: strId2 });
        }
        return false;
      }
    }
  }
}

/**
 * Safely gets a raw ID from a global ID, with fallback handling
 */
export function getRawId(globalId: string | null | undefined): string | null {
  if (!globalId) {
    return null;
  }
  
  try {
    const { id } = fromGlobalId(globalId);
    return id;
  } catch {
    return globalId;
  }
}