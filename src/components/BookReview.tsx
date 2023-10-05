import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetSingleReviewQuery,
  usePostReviewMutation,
} from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';

interface IProps {
  id: string;
}

export default function BookReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [postReview, { isLoading, isError, isSuccess }] =
    usePostReviewMutation();
  console.log(isLoading, isError, isSuccess);
  const { user } = useAppSelector((state) => state.user);

  const {
    data: reviews,
    error: reviewtError,
    isLoading: reviewLoading,
  } = useGetSingleReviewQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 50000,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data: { user: user?.email, comment: inputValue },
    };

    postReview(options);

    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {reviews &&
          reviews?.reviews?.map((review: string, index: number) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <div>
                <Avatar>
                  <AvatarImage src="https://live.staticflickr.com/65535/53231528376_5176e9f77e_m.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <small>{review?.user}</small>
              </div>
              <p className="mx-5">{review?.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
