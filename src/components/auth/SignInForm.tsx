'use client';
import { ChangeEvent, useActionState, useEffect } from 'react';
import { useFormValidate } from '../../../hooks/useFormValidate';
import { SignInSchema } from '../../../schemas/auth';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import FormCard from './FormCard';
import Submit from './Submit';
import { SignInFormError } from '../../../types/form';
import FormMessage from './FormMessage';
import { signIn } from '../../../actions/signin';
import toast from 'react-hot-toast';

export default function SignInForm() {
  const [error, action] = useActionState(signIn, undefined);
  const { errors, validateField } =
    useFormValidate<SignInFormError>(SignInSchema);

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
        title='로그인'
        footer={{ label: '계정이 없으신가요?', href: '/signup' }}
      >
        <form action={action} className='space-y-6'>
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
          <Submit className='w-full'>로그인</Submit>
        </form>
      </FormCard>
    </>
  );
}
