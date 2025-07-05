import myBannerImg from "@/assets/banner-my.jpg";
import { useAppSelector } from "@/redux/hook";
import { selectUser, selectUserLoading } from "@/redux/features/authSlice";
import LoginAlert from "@/components/LoginAlert";
import type { FC } from "react";
import SectionContainer from "@/components/SectionContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowByUserIdQuery } from "@/redux/api/baseApi";
import { CircleCheckBig } from "lucide-react";
import { BorrowReturnModal } from "../allBorrows/BorrowReturnModal";
import type { NewRes } from "../allBorrows/AllBorrows";
import Loading from "@/components/Loading";

const MyBorrows: FC = () => {
  const user = useAppSelector(selectUser);
  const userLoading = useAppSelector(selectUserLoading);

  const { data, isLoading } = useGetBorrowByUserIdQuery(user ? user._id : "");

  if (isLoading || userLoading) return <Loading />;

  return (
    <SectionContainer img={myBannerImg} sectionTitle="My Borrows">
      {user ? (
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
      ) : (
        <LoginAlert text="To see your borrows," />
      )}
    </SectionContainer>
  );
};

export default MyBorrows;
