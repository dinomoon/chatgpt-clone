'use client';
import { ChangeEvent, useActionState, useEffect } from 'react';
import { useFormValidate } from '@/hooks/useFormValidate';
import { SignUpSchema } from '@/schemas/auth';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import FormCard from './FormCard';
import Submit from './Submit';
import { SignUpFormError } from '@/types/form';
import FormMessage from './FormMessage';
import { signUp } from '@/actions/signup';
import toast from 'react-hot-toast';

export default function SignUpForm() {
  const [error, action] = useActionState(signUp, undefined);
  const { errors, validateField } =
    useFormValidate<SignUpFormError>(SignUpSchema);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <>
      <FormCard
        title='회원가입'
        footer={{ label: '이미 계정이 있으신가요?', href: '/signin' }}
      >
        <form action={action} className='space-y-6'>
          <div className='space-y-1'>
            <Label htmlFor='name'>이름</Label>
            <Input
              onChange={handleChange}
              id='name'
              name='name'
              placeholder='이름을 입력해주세요.'
              error={Boolean(errors?.name)}
            />
            {errors?.name && <FormMessage message={errors.name[0]} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='email'>이메일</Label>
            <Input
              onChange={handleChange}
              id='email'
              name='email'
              placeholder='example@example.com'
              error={Boolean(errors?.email)}
            />
            {errors?.email && <FormMessage message={errors.email[0]} />}
          </div>
          <div className='space-y-1'>
            <Label htmlFor='password'>비밀번호</Label>
            <Input
              onChange={handleChange}
              id='password'
              name='password'
              type='password'
              placeholder='******'
              error={Boolean(errors?.password)}
            />
            {errors?.password && <FormMessage message={errors.password[0]} />}
          </div>
          <Submit className='w-full'>가입하기</Submit>
        </form>
      </FormCard>
    </>
  );
}
