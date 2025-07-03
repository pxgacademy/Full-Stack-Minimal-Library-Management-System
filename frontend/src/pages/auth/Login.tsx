import bannerL from "@/assets/banner-l.webp";
import Banner from "@/components/Banner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUserLoginMutation } from "@/redux/api/userApi";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((val) => /[A-Za-z]/.test(val) && /\d/.test(val), {
      message: "Password must include at least one letter and one number",
    }),
});

type AddUserFormSchema = z.infer<typeof schema>;

const Login = () => {
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [loginUser] = useUserLoginMutation();

  const form = useForm<AddUserFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  const onSubmit = async (data: AddUserFormSchema) => {
    setIsUserLoading(true);
    try {
      const res = await loginUser(data).unwrap();
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsUserLoading(false);
    }

    form.reset();
  };

  return (
    <section className="mt-12">
      <Banner img={bannerL} text="Login" />

      <div className="px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-3 bg-gray-50 p-5 rounded-lg border border-gray-300"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe@mail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="**********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex items-center justify-center">
              <Button
                disabled={isUserLoading}
                type="submit"
                className="h-8 py-2 disabled:opacity-100 cursor-pointer"
              >
                {isUserLoading ? (
                  <span className="flex items-center gap-x-2">
                    <LoaderCircle size={18} className="animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Log-in"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Login;
