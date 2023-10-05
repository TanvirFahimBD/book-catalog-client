import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/features/cart/cartSlice';

interface IProps {
  product: IBook;
}

export default function BookCardHome({ book }: IProps) {
  const dispatch = useAppDispatch();

  const handleAddProduct = (book: IBook) => {
    dispatch(addToCart(book));
    toast({
      description: 'Book Added',
    });
  };

  return (
    <div>
      <div className="rounded-2xl h-[300px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img src={book?.image} alt="product" />
        </Link>
      </div>
    </div>
  );
}
