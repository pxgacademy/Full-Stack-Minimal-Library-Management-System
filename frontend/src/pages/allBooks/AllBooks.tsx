import bannerImage from "@/assets/banner.jpg";
import { useGetAllBooksQuery, type QueryParams } from "@/redux/api/bookApi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookGenres } from "@/types";
import { useState } from "react";

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

  if (isLoading) return <div>Loading</div>;

  console.log(data);

  return (
    <section className="w-full">
      <div className="w-full max-h-96 overflow-hidden">
        <img
          src={bannerImage}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 mt-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto gap-x-4 gap-y-2">
            {/* filter by genre */}
            <Select
              onValueChange={(value) => handleFilterChange("filter", value)}
            >
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
            <Select
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
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
            <Select
              onValueChange={(value) => handleFilterChange("limit", value)}
            >
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
        </div>
      </div>
      <div>Total data: {data?.data.length}</div>
    </section>
  );
};

export default AllBooks;
