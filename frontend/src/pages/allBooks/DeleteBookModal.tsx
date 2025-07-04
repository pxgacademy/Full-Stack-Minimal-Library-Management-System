import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { BookResponse } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteBookModal({ book }: { book: BookResponse }) {
  const handleDelete = () => {
    toast.success("Successfully delete this book");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer text-red-500">
          <Trash2 size={18} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            ISBN: {book.isbn}, your are going to delete this book permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
