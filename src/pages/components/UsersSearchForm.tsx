import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import useUserContext from "@/context/UserContext";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Required",
  }),
});

export function UsersSearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const { setSearchTerm } = useUserContext();

  const handleOnSubmit = (data: z.infer<typeof FormSchema>) => {
    setSearchTerm(data.username);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex w-full my-10"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <div className="flex !mt-0">
                <FormControl>
                  <Input placeholder="Enter user name" {...field} />
                </FormControl>
                <Button type="submit" className="mt-auto ml-2">
                  Search
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
