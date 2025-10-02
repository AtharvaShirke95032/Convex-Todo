"use client";

import { api } from "@/convex/_generated/api";
import { TodoFormValues, todoSchema } from "@/schema/todo";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const categories = [
  { label: "Study 📚", value: "study" },
  { label: "Work 💼", value: "work" },
  { label: "Exercise 🏃", value: "exercise" },
  { label: "Groceries 🛒", value: "groceries" },
  { label: "Chill 😸", value: "chill" },
  { label: "Other 😒", value:"other"}
];


const TodoForm = () => {
  const { userId } = useAuth();
  const addTodo = useMutation(api.todos.addTodo);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: "",
      category: "",
    },
  });

  const onSubmit = (data: TodoFormValues) => {
    if (!userId) return;

    addTodo({
      text: data.text,
      category: data.category,
      ownerId: userId,
    });

    form.reset({
      text: "",
      category: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-xl mx-auto px-4 sm:px-6"
      >
        {/* Todo Text Input */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Todo Text</FormLabel>
              <FormControl>
                <input
                  {...field}
                  placeholder="Walk outside.."
                  className="w-full px-3 py-2 border rounded-md"
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Dropdown */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-left"
                    >
                      {field.value
                        ? categories.find((c) => c.value === field.value)?.label
                        : "Select a category"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.value}
                        onSelect={() => field.onChange(cat.value)}
                      >
                        {cat.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full sm:w-auto">
          Add Todo
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;