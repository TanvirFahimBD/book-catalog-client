import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.jpg';
import hero from '@/assets/images/hero.jpg';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import BookCardHome from '@/components/BookCardHome';
import { IBook } from '@/types/globalTypes';

export default function Home() {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            “There is some <br /> good in this world,
          </h1>
          <p className="text-secondary font-semibold text-xl">
            and its worth fighting for.” — J.R.R. Tolkien, The Two Towers
          </p>
          <div className="text-primary mt-20">
            <p>20,000 Leagues Under the Sea: Large Print Classics</p>
            <p>Jules Verne Copyright 2006</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src={banner} alt="" width={500} />
        </div>
      </div>
      <div className="mb-96">
        <div>
          <img className="mx-auto" src={hero} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-black text-primary uppercase mt-10">
            The knowledge is here
          </h1>
          <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
            {data?.data?.slice(0, 10).map((book: IBook) => (
              <BookCardHome key={book._id} book={book} />
            ))}
          </div>
          <Button className="mt-10" asChild>
            <Link to="/books">Browse all books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
