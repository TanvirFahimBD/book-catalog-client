import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import {
  setPublishYear,
  setSearchBook,
} from '@/redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';

export default function Books() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const [book, setBook] = useState('');
  const { publishYear, searchBook } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPublishYear(value[0]));
  };

  let booksData;
  if (searchBook) {
    booksData = data?.data?.filter(
      (item: { title: string; genre: string; author: string[] }) =>
        item.title.toLowerCase().includes(searchBook.toLocaleLowerCase()) ||
        item.genre.toLowerCase().includes(searchBook.toLocaleLowerCase())
    );
  } else if (publishYear > 0) {
    booksData = data?.data?.filter(
      (item: { publicationYear: number }) => item.publicationYear < publishYear
    );
  } else {
    booksData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Find yours</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Input
              placeholder="Title, Author, Genre"
              type="text"
              onChange={(e) => setBook(e.target.value)}
            />
            <Button onClick={() => dispatch(setSearchBook(book))}>
              Search
            </Button>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Publish year</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[2023]}
              max={2023}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {publishYear}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {booksData?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
