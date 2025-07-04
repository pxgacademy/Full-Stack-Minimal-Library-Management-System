import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import type { BookResponse } from "@/types";
import { Eye } from "lucide-react";
import { useState } from "react";

const BookDetailsModal = ({ book }: { book: BookResponse }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild className="cursor-pointer">
          <button className="flex justify-center w-full text-gray-600">
            <Eye size={18} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Book Details
          </DialogDescription>

          <div>
            <p>Created At: {book.createdAt.toString()}</p>
            <p>Title: {book.title}</p>
            <p>Description: {book.description}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Author: {book.author}</p>
            <p>
              Available Copies:{" "}
              <span
                className={cn(
                  "bg-green-200 inline-block px-1.5 py-0.5 rounded font-semibold text-gray-800",
                  {
                    "bg-red-200": book.copies < 5,
                  }
                )}
              >
                {book.copies}
              </span>{" "}
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="outline"
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default BookDetailsModal;
