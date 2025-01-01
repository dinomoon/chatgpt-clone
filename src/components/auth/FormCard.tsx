import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';

interface FormCardProps {
  title: string;
  footer: { label: string; href: string };
  children: React.ReactNode;
}

export default function FormCard({ title, footer, children }: FormCardProps) {
  return (
    <Card className='w-[500px] flex flex-col items-center border'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='w-[90%]'>{children}</CardContent>
      <CardFooter>
        <Link className='text-sm text-sky-700' href={footer.href}>
          {footer.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
