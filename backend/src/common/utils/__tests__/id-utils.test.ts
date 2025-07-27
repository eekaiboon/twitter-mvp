/**
 * Tests for backend ID utilities
 */
import { toGlobalId, fromGlobalId, extractDatabaseId, idsMatch } from '../id-utils';

describe('Backend ID Utilities', () => {
  describe('toGlobalId', () => {
    it('converts a type and numeric ID to a global ID', () => {
      const globalId = toGlobalId('User', 123);
      
      // VXNlcjoxMjM= is the Base64 encoding of "User:123"
      expect(globalId).toBe('VXNlcjoxMjM=');
    });

    it('converts a type and string ID to a global ID', () => {
      const globalId = toGlobalId('Tweet', '456');
      
      // VHdlZXQ6NDU2 is the Base64 encoding of "Tweet:456"
      expect(globalId).toBe('VHdlZXQ6NDU2');
    });
  });

  describe('fromGlobalId', () => {
    it('parses a valid global ID into type and ID', () => {
      // VXNlcjoxMjM= is the Base64 encoding of "User:123"
      const result = fromGlobalId('VXNlcjoxMjM=');
      
      expect(result).toEqual({
        type: 'User',
        id: '123'
      });
    });

    it('throws an error for invalid global ID format', () => {
      // SW52YWxpZA== is the Base64 encoding of "Invalid"
      expect(() => {
        fromGlobalId('SW52YWxpZA==');
      }).toThrow('Invalid global ID format');
    });

    it('throws an error for invalid entity type', () => {
      // VW5rbm93bjoxMjM= is the Base64 encoding of "Unknown:123"
      expect(() => {
        fromGlobalId('VW5rbm93bjoxMjM=');
      }).toThrow('Invalid global ID format');
    });
  });

  describe('extractDatabaseId', () => {
    it('extracts a database ID from a global ID', () => {
      // VXNlcjoxMjM= is the Base64 encoding of "User:123"
      const id = extractDatabaseId('VXNlcjoxMjM=');
      expect(id).toBe(123);
    });

    it('returns a number directly if provided a numeric ID', () => {
      const id = extractDatabaseId(456);
      expect(id).toBe(456);
    });

    it('converts a string numeric ID to a number', () => {
      const id = extractDatabaseId('789');
      expect(id).toBe(789);
    });

    it('throws an error for non-numeric ID in a global ID', () => {
      // VXNlcjphYmM= is the Base64 encoding of "User:abc"
      expect(() => {
        extractDatabaseId('VXNlcjphYmM=');
      }).toThrow('Invalid numeric ID');
    });

    it('throws an error for non-numeric string that is not a global ID', () => {
      expect(() => {
        extractDatabaseId('not-a-number');
      }).toThrow('Unable to extract database ID');
    });
  });

  describe('idsMatch', () => {
    it('matches identical IDs', () => {
      expect(idsMatch('123', '123')).toBe(true);
      expect(idsMatch(123, 123)).toBe(true);
      expect(idsMatch('VXNlcjoxMjM=', 'VXNlcjoxMjM=')).toBe(true);
    });

    it('matches a global ID with its corresponding database ID', () => {
      expect(idsMatch('VXNlcjoxMjM=', '123')).toBe(true);
      expect(idsMatch('123', 'VXNlcjoxMjM=')).toBe(true);
      expect(idsMatch(123, 'VXNlcjoxMjM=')).toBe(true);
    });

    it('does not match different IDs', () => {
      expect(idsMatch('123', '456')).toBe(false);
      expect(idsMatch('VXNlcjoxMjM=', 'VXNlcjo0NTY=')).toBe(false);
      expect(idsMatch('VXNlcjoxMjM=', '456')).toBe(false);
    });
  });
});