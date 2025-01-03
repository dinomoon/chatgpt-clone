'use server';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '../data/user';
import { SignInSchema } from '../schemas/auth';
import bcrypt from 'bcryptjs';
import { createSession } from './sessions';

export const signIn = async (_: any, formData: FormData) => {
  // 1. validate fields
  const validateFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (validateFields.error) {
    return {
      errorMessage: '잘못된 입력값이 있습니다.',
    };
  }

  // 2. 존재하는 사용자인지 확인
  const { email, password } = validateFields.data;

  try {
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      return {
        errorMessage: '존재하지 않는 사용자입니다.',
      };
    }

    const { id, name, password: hashedPassword } = existUser;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return {
        errorMessage: '비밀번호가 일치하지 않습니다.',
      };
    }

    await createSession({ id, name });
  } catch (error) {
    console.error('errror: ', error);
    return {
      errorMessage: '문제가 발생했습니다.',
    };
  }

  redirect('/');
};
