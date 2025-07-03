import bannerImg2 from "@/assets/banner2.jpg";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bookGenres } from "@/types";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Banner from "@/components/Banner";
import { useCreateBookMutation } from "@/redux/api/bookApi";
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

const AddBooks = () => {
  const [isIsbnLoading, setIsIsbnLoading] = useState(false);
  const [isBookLoading, setIsBookLoading] = useState(false);

  const [createBook] = useCreateBookMutation();

  const form = useForm<AddBookFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      copies: 1,
    },
  });

  // submit handler
  const onSubmit = async (data: AddBookFormSchema) => {
    const newBook = {
      ...data,
      available: true,
    };

    setIsBookLoading(true);
    try {
      const res = await createBook(newBook).unwrap();
      console.log(res);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBookLoading(false);
    }

    form.reset();
  };

  const generateIsbn = () => {
    setIsIsbnLoading(true);
    form.setValue("isbn", "");
    setTimeout(() => {
      const isbn = Date.now().toString();
      form.setValue("isbn", isbn);
      setIsIsbnLoading(false);
    }, 800);
  };

  return (
    <section>
      <Banner img={bannerImg2} text="Add Book" />

      <div className="px-4 mt-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-3 bg-gray-50 p-5 rounded-lg border border-gray-300"
          >
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
                    <div className="relative flex items-center">
                      <Input {...field} placeholder="ISBN" readOnly />
                      <button
                        type="button"
                        onClick={generateIsbn}
                        className="absolute right-0 bg-gray-200 rounded px-2 py-1.5 min-w-20 min-h-9 cursor-pointer flex items-center justify-center"
                      >
                        {isIsbnLoading ? (
                          <LoaderCircle size={18} className="animate-spin" />
                        ) : (
                          "Generate"
                        )}
                      </button>
                    </div>
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

            <div className="pt-4 flex items-center justify-center">
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
      </div>
    </section>
  );
};

export default AddBooks;
