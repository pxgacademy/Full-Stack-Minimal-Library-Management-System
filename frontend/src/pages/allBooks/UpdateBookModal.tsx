import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bookGenres, type BookResponse } from "@/types";
import { LoaderCircle, SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string(),
  author: z.string().min(5, "Author must be at least 5 characters"),
  genre: z.string(),
  isbn: z.string().min(5, "Generate a ISBN"),
  copies: z.coerce.number().min(1, "Minimum 1 copy required"),
});

type AddBookFormSchema = z.infer<typeof schema>;

const UpdateBookModal = ({ book }: { book: BookResponse }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isBookLoading, setIsBookLoading] = useState<boolean>(false);

  const [updateBook] = useUpdateBookMutation();

  const form = useForm<AddBookFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: book?.title,
      description: book?.description,
      author: book?.author,
      genre: book?.genre,
      isbn: book?.isbn,
      copies: book?.copies,
    },
  });

  // submit handler
  const onSubmit = async (data: AddBookFormSchema) => {
    const newBook = {
      ...data,
      id: book._id,
      available: true,
    };

    setIsBookLoading(true);
    try {
      const res = await updateBook(newBook).unwrap();
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsBookLoading(false);
      setOpen(false);
    }

    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <button className="cursor-pointer text-gray-600">
            <SquarePen size={18} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update a Book</DialogTitle>
          </DialogHeader>
          <DialogDescription>Book Details</DialogDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Author" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* priority */}
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full mt-2">
                        <SelectTrigger>
                          <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bookGenres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ISBN" readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="copies"
                rules={{
                  required: "Copies is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 copy required",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Copies"
                        // min={1}
                        // onChange={(e) => {
                        //   const value = Number(e.target.value);
                        //   field.onChange(value < 0 ? 0 : value);
                        // }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default UpdateBookModal;
