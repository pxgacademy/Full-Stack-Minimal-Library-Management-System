import bannerImage from "@/assets/banner.jpg";
import { useGetAllBooksQuery, type QueryParams } from "@/redux/api/baseApi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookGenres, type BookResponse } from "@/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddBorrowModal from "./AddBorrowModal";
import UpdateBookModal from "./UpdateBookModal";
import UpdateBookCopiesModal from "./UpdateBookCopiesModal";
import BookDetailsModal from "./BookDetailsModal";
import { DeleteBookModal } from "./DeleteBookModal";
import SectionContainer from "@/components/SectionContainer";
import Loading from "@/components/Loading";

const defaultValue = {
  filter: "ALL",
  sortBy: "createdAt",
  sort: "asc",
  limit: "all",
};

const AllBooks = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>(
    defaultValue as QueryParams
  );
  const { data, isLoading } = useGetAllBooksQuery(queryParams);

  const handleFilterChange = (keyName: string, value: string) => {
    setQueryParams((prev) => ({
      ...prev,
      [keyName]: value,
    }));
  };

  if (isLoading) return <Loading />;

  return (
    <SectionContainer img={bannerImage} sectionTitle="All Books">
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto gap-x-4 gap-y-2">
        {/* filter by genre */}
        <Select onValueChange={(value) => handleFilterChange("filter", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Genre</SelectLabel>
              <SelectItem value="ALL">ALL</SelectItem>
              {bookGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* filter by sort by */}
        <Select onValueChange={(value) => handleFilterChange("sortBy", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Names</SelectLabel>
              <SelectItem value="createdAt">Created At</SelectItem>
              <SelectItem value="genre">Genre</SelectItem>
              <SelectItem value="isbn">ISBN</SelectItem>
              <SelectItem value="copies">Copies</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* filter by sort */}
        <Select
          defaultValue="asc"
          onValueChange={(value) => handleFilterChange("sort", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Orders</SelectLabel>
              <SelectItem value="asc">ASCENDING</SelectItem>
              <SelectItem value="desc">DESCENDING</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* filter by sort */}
        <Select onValueChange={(value) => handleFilterChange("limit", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Set a Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Limits</SelectLabel>
              <SelectItem value="all">ALL</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[100px]">#SN</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-center">Copies</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead className="text-center">Borrow</TableHead>
              <TableHead className="text-center">Details</TableHead>
              <TableHead className="text-center">Update</TableHead>
              <TableHead className="text-center">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((book: BookResponse, i: number) => (
              <TableRow key={book._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell className="flex justify-center">
                  <UpdateBookCopiesModal book={book} />
                </TableCell>
                <TableCell className="text-center">
                  <AddBorrowModal book={book} />
                </TableCell>
                <TableCell className="text-center">
                  <BookDetailsModal book={book} />
                </TableCell>
                <TableCell className="text-center">
                  <UpdateBookModal book={book} />
                </TableCell>
                <TableCell className="text-center">
                  <DeleteBookModal book={book} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </SectionContainer>
  );
};

export default AllBooks;
