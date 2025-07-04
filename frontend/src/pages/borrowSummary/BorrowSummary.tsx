import bannerImage3 from "@/assets/banner3.webp";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BorrowSummaryT } from "@/types";
import SectionContainer from "@/components/SectionContainer";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery("");

  if (isLoading) return <div>Loading...</div>;

  return (
    <SectionContainer img={bannerImage3} sectionTitle="Borrow Summary">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">#SN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead className="text-center">Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((borrow: BorrowSummaryT, i: number) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{borrow?.book?.title}</TableCell>
              <TableCell>{borrow?.book?.isbn}</TableCell>
              <TableCell className="text-center">
                {borrow?.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionContainer>
  );
};

export default BorrowSummary;
