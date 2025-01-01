import { eq } from 'drizzle-orm';
import db from '../db';
import { User } from '../types/db';
import { usersTable } from '../db/schema';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!existUser) {
      return null;
    }

    return existUser;
  } catch (error) {
    console.error('error: ', error);
    throw new Error('문제가 발생했습니다.');
  }
};
