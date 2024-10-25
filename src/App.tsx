import React from "react";
import "./app.scss";
import { QUERY_CONST } from "./constants/appConstants";
import { HeaderProvider } from "./hook/useHeader";
import { RouterComponent } from "./route/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        ...QUERY_CONST,
      },
    },
  });

  // Create a new router instance
  const router = createRouter({ routeTree });

  return (
    <QueryClientProvider client={queryClient}>
      <HeaderProvider>
        <RouterProvider router={router} />
      </HeaderProvider>
    </QueryClientProvider>
  );
}

export default App;
