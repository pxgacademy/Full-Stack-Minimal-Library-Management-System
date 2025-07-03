import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useUpdateBookCopiesMutation } from "@/redux/api/baseApi";
import type { BookResponse } from "@/types";
import { CircleCheckBig, CircleX, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateBookCopiesModal = ({ book }: { book: BookResponse }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isBookLoading, setIsBookLoading] = useState<boolean>(false);
  const [copies, setCopies] = useState<string>(book.copies.toString());

  const [updateBookCopies] = useUpdateBookCopiesMutation();

  // submit handler
  const onSubmit = async () => {
    const newCopies = parseInt(copies);

    console.log(newCopies);

    if (newCopies < 1) {
      toast.error("Copy must be at least 1");
      return;
    }

    setIsBookLoading(true);
    try {
      const res = await updateBookCopies({
        id: book._id,
        copies: newCopies,
      }).unwrap();
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsBookLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild className="cursor-pointer">
          {book.available ? (
            <CircleCheckBig size={18} className="text-green-500" />
          ) : (
            <CircleX size={18} className="text-red-500" />
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Book Copies</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div>
              <p className="font-semibold text-gray-800">Book Details</p>
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
          </DialogDescription>

          <Label>Copies</Label>
          <Input
            type="number"
            placeholder="Copies"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            min={1}
          />

          <div className="pt-4 flex items-center justify-end gap-x-3">
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="outline"
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isBookLoading}
              type="submit"
              className="h-8 py-2 disabled:opacity-100 cursor-pointer"
            >
              {isBookLoading ? (
                <span className="flex items-center gap-x-2">
                  <LoaderCircle size={18} className="animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UpdateBookCopiesModal;
