/**
 * Tests for ID utilities
 * 
 * Note: These tests are platform-agnostic and should work in both Node.js and browser environments.
 * Implementation-specific encoding/decoding functions need to be mocked for these tests.
 */

import * as IdUtils from '../id-utils';

// Mock the encoding/decoding functions since they're implemented in platform-specific files
const mockEncodeId = jest.fn((value: string) => Buffer.from(value).toString('base64'));
const mockDecodeId = jest.fn((encoded: string) => Buffer.from(encoded, 'base64').toString('utf-8'));

// Replace the implementation with mocks
(IdUtils as any).encodeId = mockEncodeId;
(IdUtils as any).decodeId = mockDecodeId;

describe('ID Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Entity Type Validation', () => {
    test('isValidEntityType recognizes valid types', () => {
      expect(IdUtils.isValidEntityType('User')).toBe(true);
      expect(IdUtils.isValidEntityType('Tweet')).toBe(true);
      expect(IdUtils.isValidEntityType('Follow')).toBe(true);
    });

    test('isValidEntityType rejects invalid types', () => {
      expect(IdUtils.isValidEntityType('Unknown')).toBe(false);
      expect(IdUtils.isValidEntityType('user')).toBe(false); // Case-sensitive
      expect(IdUtils.isValidEntityType('')).toBe(false);
    });
  });

  describe('toGlobalId', () => {
    test('converts type and ID to a global ID', () => {
      const result = IdUtils.toGlobalId('User', 123);
      
      expect(mockEncodeId).toHaveBeenCalledWith('User:123');
      expect(result).toBe(mockEncodeId('User:123'));
    });

    test('handles string IDs', () => {
      const result = IdUtils.toGlobalId('User', '123');
      
      expect(mockEncodeId).toHaveBeenCalledWith('User:123');
      expect(result).toBe(mockEncodeId('User:123'));
    });
  });

  describe('fromGlobalId', () => {
    test('extracts type and ID from a valid global ID', () => {
      // Setup the mock to return a specific value
      mockDecodeId.mockReturnValueOnce('User:123');
      
      const encodedId = 'VXNlcjoxMjM='; // Base64 encoded "User:123"
      const result = IdUtils.fromGlobalId(encodedId);
      
      expect(mockDecodeId).toHaveBeenCalledWith(encodedId);
      expect(result).toEqual({ type: 'User', id: '123' });
    });

    test('throws error for invalid global ID format', () => {
      mockDecodeId.mockReturnValueOnce('InvalidFormat');
      
      expect(() => {
        IdUtils.fromGlobalId('SW52YWxpZEZvcm1hdA=='); // Base64 encoded "InvalidFormat"
      }).toThrow('Invalid global ID format');
    });

    test('throws error for invalid entity type', () => {
      mockDecodeId.mockReturnValueOnce('Unknown:123');
      
      expect(() => {
        IdUtils.fromGlobalId('VW5rbm93bjoxMjM='); // Base64 encoded "Unknown:123"
      }).toThrow('Invalid global ID format');
    });

    test('throws error for decoding failure', () => {
      mockDecodeId.mockImplementationOnce(() => {
        throw new Error('Decoding failed');
      });
      
      expect(() => {
        IdUtils.fromGlobalId('invalid-base64-###');
      }).toThrow('Failed to decode global ID');
    });
  });

  describe('idsMatch', () => {
    beforeEach(() => {
      // Setup mocks for standard test cases
      mockDecodeId.mockImplementation(encoded => {
        if (encoded === 'VXNlcjoxMjM=') return 'User:123';
        if (encoded === 'VXNlcjo0NTY=') return 'User:456';
        throw new Error('Unknown encoded value');
      });
    });

    test('matches identical strings', () => {
      expect(IdUtils.idsMatch('123', '123')).toBe(true);
      expect(IdUtils.idsMatch('abc', 'abc')).toBe(true);
    });

    test('matches when both are valid global IDs with same raw ID', () => {
      // Both are global IDs with the same raw ID
      expect(IdUtils.idsMatch('VXNlcjoxMjM=', 'VXNlcjoxMjM=')).toBe(true);
    });

    test('matches when one is global ID and one is raw ID', () => {
      mockDecodeId.mockReturnValueOnce('User:123');
      
      // One is global ID, one is raw ID
      expect(IdUtils.idsMatch('VXNlcjoxMjM=', '123')).toBe(true);
      
      mockDecodeId.mockReturnValueOnce('User:123');
      expect(IdUtils.idsMatch('123', 'VXNlcjoxMjM=')).toBe(true);
    });

    test('does not match different IDs', () => {
      expect(IdUtils.idsMatch('123', '456')).toBe(false);
      
      mockDecodeId.mockReturnValueOnce('User:123');
      mockDecodeId.mockReturnValueOnce('User:456');
      expect(IdUtils.idsMatch('VXNlcjoxMjM=', 'VXNlcjo0NTY=')).toBe(false);
      
      mockDecodeId.mockReturnValueOnce('User:123');
      expect(IdUtils.idsMatch('VXNlcjoxMjM=', '456')).toBe(false);
    });

    test('handles decoding errors gracefully', () => {
      mockDecodeId.mockImplementationOnce(() => {
        throw new Error('Decoding failed');
      });
      
      // If decoding fails, comparison falls back to direct string comparison
      expect(IdUtils.idsMatch('invalid-id', 'invalid-id')).toBe(true);
      expect(IdUtils.idsMatch('invalid-id', 'other-id')).toBe(false);
    });
  });
});