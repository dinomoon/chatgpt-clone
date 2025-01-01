import { Button, ButtonProps } from '../ui/button';

export default function Submit({ children, ...props }: ButtonProps) {
  return (
    <Button type='submit' {...props}>
      {children}
    </Button>
  );
}
