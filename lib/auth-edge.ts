import { jwtVerify } from 'jose';
import { SessionUser } from './types';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production-12345'
);

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as 'user' | 'admin',
    };
  } catch {
    return null;
  }
}
