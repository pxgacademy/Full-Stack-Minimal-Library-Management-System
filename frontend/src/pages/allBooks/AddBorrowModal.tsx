import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, LoaderCircle, ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BookResponse, BorrowBookInputs } from "@/types";
import { useCreateBorrowMutation } from "@/redux/api/bookApi";
import { toast } from "sonner";

//* user: string;
//* book: string;
//* quantity: number;
//* dueDate: Date;
//* isReturned: boolean;

const schema = z.object({
  dueDate: z.date({
    required_error: "Due date is required",
    invalid_type_error: "Please select a valid date",
  }),
  quantity: z.coerce.number().min(1, "Minimum 1 copy required"),
});

type AddBorrowFormSchema = z.infer<typeof schema>;

export default function AddBorrowModal({ book }: { book: BookResponse }) {
  const [open, setOpen] = useState<boolean>(false);
  const [isBorrowLoading, setIsBorrowLoading] = useState<boolean>(false);

  const [createBorrow] = useCreateBorrowMutation();

  //
  const form = useForm<AddBorrowFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      dueDate: undefined,
    },
  });

  const user = {
    _id: "6866414258e5d63c3c335b15",
    // _id: "5d63c3c335b15",
    name: "alkdj",
  };

  // submit handler
  const onSubmit = async (data: AddBorrowFormSchema) => {
    const newBorrow: BorrowBookInputs = {
      ...data,
      user: user._id,
      book: book._id,
      isReturned: false,
    };

    setIsBorrowLoading(true);

    try {
      const res = await createBorrow(newBorrow).unwrap();
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
      // console.log(res);
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsBorrowLoading(false);
    }

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <button
            className="cursor-pointer disabled:cursor-not-allowed text-gray-600"
            disabled={!book.available}
          >
            <ShoppingBag size={18} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Borrow a Book</DialogTitle>
          </DialogHeader>
          <DialogDescription>
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="quantity"
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
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          field.onChange(
                            value > book.copies ? book.copies : value
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* date */}
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2 w-full">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a due date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || false}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
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
                  disabled={isBorrowLoading}
                  type="submit"
                  className="h-8 py-2 disabled:opacity-100 cursor-pointer"
                >
                  {isBorrowLoading ? (
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
}
