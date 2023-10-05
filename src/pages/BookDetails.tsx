import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { MouseEvent } from 'react';

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading: singleBQLoading,
    error,
  } = useSingleBookQuery(id);
  console.log(singleBQLoading, error);
  const [deleteBook, { isLoading, isError, isSuccess }] =
    useDeleteBookMutation();
  console.log(isLoading, isError, isSuccess);

  const handleDelete = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const respons = confirm('Do you want to delete');
    if (respons) {
      deleteBook(id);
      toast({
        description: 'Book deleted',
      });
      navigate('/books');
    }
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%] ms-40">
          <img src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3 my-40">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p className="text-xl">Rating: {book?.rating}</p>
          <p className="text-xl">Rating: {book?.author[0]}</p>
          <p className="text-xl">Rating: {book?.genre}</p>
          <p className="text-xl">Rating: {book?.publicationYear}</p>
          <Button className="me-3">
            <Link to={`/edit-book/${id}`}>Edit</Link>
          </Button>
          <Button
            className="bg-red-400"
            onClick={(event: any) => handleDelete(event)}
          >
            Delete
          </Button>
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
