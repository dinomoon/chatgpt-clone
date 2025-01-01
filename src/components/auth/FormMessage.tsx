export default function FormMessage({ message }: { message: string }) {
  return <p className='text-sm text-red-600 ml-1 mt-1'>{message}</p>;
}
