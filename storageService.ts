import { SharedPackage } from '../types';

// In a real app, this would be a backend database. 
// For this demo, we use an in-memory map.
const storage = new Map<string, SharedPackage>();

export const StorageService = {
  savePackage: (pkg: SharedPackage): void => {
    storage.set(pkg.id, pkg);
    console.log(`Package saved with ID: ${pkg.id}`);
  },

  getPackage: (id: string): SharedPackage | undefined => {
    return storage.get(id);
  },

  generateId: (): string => {
    // Generates a random 6-character alphanumeric code (uppercase)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed look-alike chars like I, 1, O, 0
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
};