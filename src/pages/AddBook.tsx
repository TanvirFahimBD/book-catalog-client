import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { usePostBookMutation } from '@/redux/features/books/bookApi';

import { MouseEvent, useState } from 'react';

export default function AddBook() {
  const [postBook, { isLoading, isError, isSuccess }] = usePostBookMutation();
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
    const newBook = {
      title,
      author: [author],
      genre,
      publicationYear,
      publisher: { name: publisherName, location: publisherLocation },
      rating,
      price,
      image,
      reviews: [],
    };
    postBook(newBook);
    toast({
      description: 'Book Created',
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
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  type="text"
                  id="author"
                  className="mt-2"
                  onChange={(e) => seAuthor(e.target.value)}
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
                />
              </div>
              <div>
                <Label htmlFor="publicationYear">Publication Year</Label>
                <Input
                  type="number"
                  id="publicationYear"
                  className="mt-2"
                  onChange={(e) => setPublicationYear(parseInt(e.target.value))}
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
                />
              </div>
              <div>
                <Label htmlFor="publisherLocation">Publisher Location</Label>
                <Input
                  type="text"
                  id="publisherLocation"
                  className="mt-2"
                  onChange={(e) => setPublisherLocation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  type="text"
                  id="image"
                  className="mt-2"
                  onChange={(e) => setImage(e.target.value)}
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
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="text"
                  id="price"
                  className="mt-2"
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </div>
              <div>
                <Button className="my-8" onClick={(e) => handleSubmit(e)}>
                  Add book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
