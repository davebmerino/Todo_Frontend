import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { TasksContextProvider } from "./features/task/context/task.context.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { router } from "@/routes.jsx";
import "@/index.css";
import { Toaster } from "./components/ui/toast";

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-text-secondary">Loading...</p>
    </div>
  );
}

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TasksContextProvider>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
          <Toaster />
        </Suspense>
      </TasksContextProvider>
      <ReactQueryDevtools initailIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
