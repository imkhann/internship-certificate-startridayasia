import fs from 'fs';
import path from 'path';
import { User } from './types';
import usersSeed from '@/data/users.json';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');
const SEED_USERS = usersSeed as unknown as User[];

export function getUsers(): User[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? (parsed as User[]) : SEED_USERS;
  } catch (error) {
    console.error('Error reading users:', error);
    return SEED_USERS;
  }
}

export function getUserById(id: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

export function saveUsers(users: User[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
}

export function addUser(user: User): boolean {
  const users = getUsers();
  users.push(user);
  return saveUsers(users);
}

export function updateUser(id: string, updates: Partial<User>): boolean {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) return false;
  
  users[index] = { ...users[index], ...updates };
  return saveUsers(users);
}

export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) return false;
  
  return saveUsers(filteredUsers);
}

export function generateUserId(): string {
  return `u${Date.now()}`;
}

export function generateCertificateId(): string {
  return `cert${Date.now()}`;
}
