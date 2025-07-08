/**
 * Converts a type name and database ID to a global Relay-compatible ID
 * Following the Relay Global Object Identification spec
 * https://relay.dev/graphql/objectidentification.htm
 * 
 * @param type The type name (e.g., 'User', 'Tweet')
 * @param id The database ID
 * @returns A base64-encoded global ID
 */
export function toGlobalId(type: string, id: number | string): string {
  return Buffer.from(`${type}:${id}`).toString('base64');
}

/**
 * Converts a global Relay-compatible ID back to its type name and database ID
 * 
 * @param globalId A base64-encoded global ID
 * @returns An array containing the type name and database ID
 */
export function fromGlobalId(globalId: string): [string, string] {
  const decoded = Buffer.from(globalId, 'base64').toString();
  const [type, id] = decoded.split(':');
  return [type, id];
}

/**
 * Creates a NodeType reference for use in resolvers
 * 
 * @param type The type name of the node
 * @param id The database ID of the object
 */
export function nodeId(type: string, id: number | string): string {
  return toGlobalId(type, id);
}