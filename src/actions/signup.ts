'use server';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '../data/user';
import db from '../../db';
import { usersTable } from '../../db/schema';
import { SignUpSchema } from '../schemas/auth';
import bcrypt from 'bcryptjs';

export const signUp = async (_: any, formData: FormData) => {
  try {
    // 1. validate fields
    const validateFields = SignUpSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (validateFields.error) {
      return {
        errorMessage: '잘못된 입력값이 있습니다.',
      };
    }

    // 2. 존재하는 사용자인지 확인
    const { name, email, password } = validateFields.data;
    const existUser = await getUserByEmail(email);
    if (existUser) {
      return {
        errorMessage: '이미 존재하는 사용자입니다.',
      };
    }

    // 3. insert db
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword });
  } catch (error) {
    console.error('errror: ', error);
    return {
      errorMessage: '문제가 발생했습니다.',
    };
  }

  redirect('/signin');
};
