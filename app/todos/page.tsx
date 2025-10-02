import SeeTodo from "@/components/seetodo";
import TodoForm from "@/components/todo-form";
import React from "react";

const Page = () => {
  return (
    <main className="flex flex-col items-center gap-6 px-4 py-6 sm:px-6 md:px-8">
      {/* Page Header */}
      <h2 className="font-bold text-2xl sm:text-3xl text-center">Add Todo</h2>

      {/* Todo Form */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm">
        <TodoForm />
      </div>

      {/* Todo List */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 border rounded-2xl p-4 shadow-sm">
        <SeeTodo />
      </div>
    </main>
  );
};

export default Page;