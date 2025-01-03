import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '../ui/button';

export default function Submit({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} {...props}>
      {children}
    </Button>
  );
}
