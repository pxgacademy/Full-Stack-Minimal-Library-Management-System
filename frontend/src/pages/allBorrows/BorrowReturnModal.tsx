import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useUpdateBorrowReturnMutation } from "@/redux/api/baseApi";
import { CircleX, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  id: string;
  title: string;
  isbn: string;
  quantity: number;
  dueDate: Date;
}

export function BorrowReturnModal({
  id,
  title,
  isbn,
  quantity,
  dueDate,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [isBorrowLoading, setIsBorrowLoading] = useState<boolean>(false);
  const [updateBorrow] = useUpdateBorrowReturnMutation();

  const handleDelete = async () => {
    setIsBorrowLoading(true);
    try {
      const res = await updateBorrow({ id, isReturned: true }).unwrap();
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsBorrowLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer text-red-500">
          <CircleX size={18} className="text-red-500" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <p>Title: {title}</p>
              <p>ISBN: {isbn}</p>
              <p>
                Quantity:{" "}
                <span className="bg-gray-100 p-1 rounded text-gray-800 font-semibold">
                  {quantity}
                </span>
              </p>
              <p>Due Date: {dueDate.toString()}</p>
              <p className="bg-red-100 mt-1 p-1 rounded text-gray-800">
                your are going to return this book
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center justify-end gap-x-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="cursor-pointer"
            >
              {isBorrowLoading ? (
                <span className="flex items-center gap-x-2">
                  <LoaderCircle size={18} className="animate-spin" />
                  Returning...
                </span>
              ) : (
                "Return"
              )}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
