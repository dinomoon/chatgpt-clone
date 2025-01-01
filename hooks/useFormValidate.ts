'use client';
import { useState } from 'react';
import { ZodObject, ZodRawShape } from 'zod';

export const useFormValidate = <T>(schema: ZodObject<ZodRawShape>) => {
  const [errors, setErrors] = useState<Partial<T>>({});

  const validateField = (name: string, value: string) => {
    setErrors({ ...errors, [name]: null });

    const parsedValue = schema
      .pick({ [name]: true })
      .safeParse({ [name]: value });

    if (parsedValue.error) {
      setErrors({ ...errors, ...parsedValue.error.flatten().fieldErrors });
    }
  };

  return { errors, validateField };
};
