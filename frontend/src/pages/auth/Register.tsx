import z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine((val) => /[A-Za-z]/.test(val) && /\d/.test(val), {
      message: "Password must include at least one letter and one number",
    }),
});

const Register = () => {
  return <div></div>;
};

export default Register;
