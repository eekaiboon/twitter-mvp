/**
 * Tests for frontend ID utilities
 */
import { toGlobalId, fromGlobalId, idsMatch, getRawId } from '../id-utils';

// Mock browser's btoa/atob functions if running in Node.js environment
const mockBtoa = jest.fn(str => Buffer.from(str).toString('base64'));
const mockAtob = jest.fn(str => Buffer.from(str, 'base64').toString());

global.btoa = global.btoa || mockBtoa;
global.atob = global.atob || mockAtob;

describe('Frontend ID Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    
    // Save original NODE_ENV and set to production to disable debug logs
    process.env.NODE_ENV = 'production';
  });

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
    
    it('logs debug info in development mode', () => {
      process.env.NODE_ENV = 'development';
      const spy = jest.spyOn(console, 'debug');
      
      toGlobalId('User', 123);
      
      expect(spy).toHaveBeenCalledWith(
        '[ID] Created global ID:', 
        expect.objectContaining({ type: 'User', id: 123 })
      );
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

    it('handles special case for "current-user"', () => {
      const result = fromGlobalId('current-user');
      
      expect(result).toEqual({
        type: 'User',
        id: 'current-user'
      });
    });
    
    it('returns unknown type for invalid format', () => {
      // SW52YWxpZA== is the Base64 encoding of "Invalid"
      const result = fromGlobalId('SW52YWxpZA==');
      
      expect(result).toEqual({
        type: 'Unknown',
        id: 'SW52YWxpZA=='
      });
    });
    
    it('handles unknown entity types gracefully', () => {
      // VW5rbm93bjoxMjM= is the Base64 encoding of "Unknown:123"
      const result = fromGlobalId('VW5rbm93bjoxMjM=');
      
      expect(result).toEqual({
        type: 'Unknown',
        id: '123'
      });
    });
    
    it('handles decoding errors gracefully', () => {
      mockAtob.mockImplementationOnce(() => {
        throw new Error('Invalid character');
      });
      
      const result = fromGlobalId('!@#invalid-base64');
      
      expect(result).toEqual({
        type: 'Unknown',
        id: '!@#invalid-base64'
      });
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
    
    it('handles null and undefined values', () => {
      expect(idsMatch(null, '123')).toBe(false);
      expect(idsMatch('123', undefined)).toBe(false);
      expect(idsMatch(null, null)).toBe(false);
      expect(idsMatch(undefined, undefined)).toBe(false);
    });
  });
  
  describe('getRawId', () => {
    it('extracts raw ID from a global ID', () => {
      const rawId = getRawId('VXNlcjoxMjM=');
      expect(rawId).toBe('123');
    });
    
    it('returns the ID directly if it is not a global ID', () => {
      const rawId = getRawId('123');
      expect(rawId).toBe('123');
    });
    
    it('returns null for null or undefined input', () => {
      expect(getRawId(null)).toBe(null);
      expect(getRawId(undefined)).toBe(null);
    });
  });
});