import bannerB from "@/assets/banner-b.jpg";
import SectionContainer from "@/components/SectionContainer";
import { useGetAllBorrowsQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BookResponse } from "@/types";
import { CircleCheckBig } from "lucide-react";
import { BorrowReturnModal } from "./BorrowReturnModal";

interface NewRes {
  _id: string;
  book: BookResponse;
  quantity: number;
  dueDate: Date;
  isReturned: boolean;
}

//
const AllBorrows = () => {
  const { data, isLoading } = useGetAllBorrowsQuery("");
  console.log(data);

  if (isLoading) return <div>Loading</div>;
  return (
    <SectionContainer img={bannerB} sectionTitle="All Borrows">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">#SN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-center">Is Returned</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map(
            (
              { _id, book, quantity, dueDate, isReturned }: NewRes,
              i: number
            ) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{book?.title}</TableCell>
                <TableCell>{book?.isbn}</TableCell>
                <TableCell className="text-center">{quantity}</TableCell>
                <TableCell>{dueDate.toString()}</TableCell>
                <TableCell className="flex justify-center">
                  {isReturned ? (
                    <CircleCheckBig size={18} className="text-green-500" />
                  ) : (
                    <BorrowReturnModal
                      id={_id}
                      title={book.title}
                      isbn={book.isbn}
                      quantity={quantity}
                      dueDate={dueDate}
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </SectionContainer>
  );
};

export default AllBorrows;
