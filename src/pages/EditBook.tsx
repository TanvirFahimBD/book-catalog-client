import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/features/books/bookApi';

import { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AddBook() {
  const { id } = useParams();
  const {
    data,
    isLoading: singleQueryBookLoading,
    error,
  } = useSingleBookQuery(id);
  console.log(singleQueryBookLoading, error);
  const [updateBook, { isLoading, isError, isSuccess }] =
    useUpdateBookMutation();

  console.log(isLoading, isError, isSuccess);

  const [title, setTitle] = useState('');
  const [author, seAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationYear, setPublicationYear] = useState(0);
  const [publisherName, setPublisherName] = useState('');
  const [publisherLocation, setPublisherLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const updatedBook = {
      title: title ? title : data.title,
      author: author ? [author] : data.author[0],
      genre: genre ? genre : data.genre,
      publicationYear: publicationYear ? publicationYear : data.publicationYear,
      publisher: {
        name: publisherName ? publisherName : data.publisher.name,
        location: publisherLocation
          ? publisherLocation
          : data.publisher.location,
      },
      rating: rating ? rating : data.rating,
      price: price ? price : data.price,
      image: image ? image : data.image,
    };
    const options = {
      id: id,
      data: updatedBook,
    };
    updateBook(options);
    toast({
      description: 'Book Updated',
    });
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-3xl w-full">
        <h1 className="mb-5 text-lg text-bold text-center">Add a new book</h1>
        <div className="h-[80vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  className="mt-2"
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={data.title}
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  type="text"
                  id="author"
                  className="mt-2"
                  onChange={(e) => seAuthor(e.target.value)}
                  defaultValue={data.author[0]}
                />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input
                  type="text"
                  id="genre"
                  className="mt-2"
                  onChange={(e) => setGenre(e.target.value)}
                  defaultValue={data.genre}
                />
              </div>
              <div>
                <Label htmlFor="publicationYear">Publication Year</Label>
                <Input
                  type="number"
                  id="publicationYear"
                  className="mt-2"
                  onChange={(e) => setPublicationYear(parseInt(e.target.value))}
                  defaultValue={data.publicationYear}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="publisherName">Publisher Name</Label>
                <Input
                  type="text"
                  id="publisherName"
                  className="mt-2"
                  onChange={(e) => setPublisherName(e.target.value)}
                  defaultValue={data.publisher.name}
                />
              </div>
              <div>
                <Label htmlFor="publisherLocation">Publisher Location</Label>
                <Input
                  type="text"
                  id="publisherLocation"
                  className="mt-2"
                  onChange={(e) => setPublisherLocation(e.target.value)}
                  defaultValue={data.publisher.location}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="text"
                  id="image"
                  className="mt-2"
                  onChange={(e) => setImage(e.target.value)}
                  defaultValue={data.image}
                />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  type="number"
                  id="rating"
                  className="mt-2"
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  defaultValue={data.rating}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="text"
                  id="price"
                  className="mt-2"
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  defaultValue={data.price}
                />
              </div>
              <div>
                <Button className="my-8" onClick={(e: any) => handleSubmit(e)}>
                  Edit book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
