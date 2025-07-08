/**
 * Adapts global Relay IDs from server to local IDs for frontend use
 * and vice versa. Keeps backward compatibility with existing code.
 */

/**
 * Extracts a numeric ID from a global Relay ID string
 * 
 * @param globalId The base64-encoded Relay ID
 * @returns The numeric ID portion
 */
export function extractIdFromGlobalId(globalId: string): number {
  try {
    const decoded = Buffer.from(globalId, 'base64').toString();
    const [_, id] = decoded.split(':');
    return parseInt(id, 10);
  } catch (e) {
    // Fallback for existing code: If the ID is already numeric or cannot be decoded
    // This ensures backward compatibility
    const numericId = parseInt(globalId, 10);
    if (!isNaN(numericId)) {
      return numericId;
    }
    console.error('Invalid ID format:', globalId);
    throw new Error('Invalid ID format');
  }
}