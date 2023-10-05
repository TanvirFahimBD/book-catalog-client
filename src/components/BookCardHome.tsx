export default function BookCardHome({ book }: any) {
  console.log(book);
  // const dispatch = useAppDispatch();

  // const handleAddProduct = (book: IBook) => {
  //   dispatch(addToCart(book));
  //   toast({
  //     description: 'Book Added',
  //   });
  // };

  return (
    <div>
      <div className="rounded-2xl h-[300px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <img src={book?.image} alt="product" />
      </div>
    </div>
  );
}
