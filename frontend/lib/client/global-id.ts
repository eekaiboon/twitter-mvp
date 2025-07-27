'use client';

// Convert raw IDs to global IDs in Relay format (base64(type:id))
export function toGlobalId(type: string, id: string | number): string {
  const globalId = btoa(`${type}:${id}`);
  console.log('[GlobalID] Converting to global ID:', { type, id, globalId });
  return globalId;
}

// Parse a global ID to get its type and raw ID
export function fromGlobalId(globalId: string): { type: string; id: string } {
  // Skip decoding if globalId is clearly not base64 encoded (contains non-base64 chars)
  if (globalId === 'current-user' || globalId === undefined) {
    console.log('[GlobalID] Not a global ID, using as raw ID:', globalId);
    return { type: 'Unknown', id: globalId };
  }

  try {
    const [type, id] = atob(globalId).split(':');
    console.log('[GlobalID] Parsed global ID:', { globalId, type, id });
    return { type, id };
  } catch (error) {
    console.log('[GlobalID] Failed to parse global ID:', { globalId, error: error.message });
    // If it's not a valid base64 encoded global ID, return the original as raw ID
    return { type: 'Unknown', id: globalId };
  }
}

// Check if two IDs match, accounting for one potentially being a global ID
export function idsMatch(id1: string, id2: string | number): boolean {
  // Convert to strings for consistent comparison
  const strId1 = String(id1);
  const strId2 = String(id2);
  
  console.log('[GlobalID] Checking if IDs match:', { id1: strId1, id2: strId2 });
  
  // Try parsing both as global IDs
  const parsed1 = fromGlobalId(strId1);
  const parsed2 = fromGlobalId(strId2);
  
  // Direct match
  if (strId1 === strId2) {
    console.log('[GlobalID] Direct match');
    return true;
  }
  
  // Check for JWT sub field matching raw ID
  // This specifically handles the case where id1 might be a tweet's author.id and id2 is the user.sub
  if (strId1.includes('VXNlcjoke') && strId1.replace('VXNlcjoke', '') === strId2) {
    console.log('[GlobalID] Matched JWT sub ID format');
    return true;
  }
  
  if (strId2.includes('VXNlcjoke') && strId2.replace('VXNlcjoke', '') === strId1) {
    console.log('[GlobalID] Matched JWT sub ID format');
    return true;
  }
  
  // If both are parsed successfully, compare the raw IDs
  if (parsed1.id && parsed2.id && parsed1.id === parsed2.id) {
    console.log('[GlobalID] Matched by comparing parsed IDs');
    return true;
  }
  
  // If one is parsed successfully, compare its raw ID with the other
  if (parsed1.id && parsed1.id === strId2) {
    console.log('[GlobalID] Matched: parsed1.id === id2');
    return true;
  }
  
  if (parsed2.id && parsed2.id === strId1) {
    console.log('[GlobalID] Matched: parsed2.id === id1');
    return true;
  }
  
  console.log('[GlobalID] No match found');
  return false;
}