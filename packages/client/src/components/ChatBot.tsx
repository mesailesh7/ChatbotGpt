import { FaArrowUp } from 'react-icons/fa'
import { Button } from './ui/button';
import { useForm } from 'react-hook-form'

type FormData = {
  prompt: string;
}

export default function ChatBot() {
  const { register, handleSubmit, reset } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-2 items-end border-2 rounded-3xl'>
      <textarea
        {...register('prompt', { required: true })}
        className='w-full border-0 focus:outline-0 resize-none ' placeholder="Ask Anything" maxLength={1000} />
      <Button className='rounded-full w-9 h-9 '><FaArrowUp /></Button>
    </form>
  );
}
