import bannerImage3 from "@/assets/banner3.webp";
import Banner from "@/components/Banner";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BorrowSummary } from "@/types";

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery("");

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="w-full mt-12">
      <Banner img={bannerImage3} text="Borrow Summary" />
      <div className="px-4 mt-6">
        <div className="container mx-auto">
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
              {data?.data?.map((borrow: BorrowSummary, i: number) => (
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
        </div>
      </div>
    </section>
  );
};

export default BorrowSummary;
