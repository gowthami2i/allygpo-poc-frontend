import React from "react";
import { QUERY_CONST } from "./constants/appConstants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterComponent } from "./routes/AppRouter";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        ...QUERY_ CONST,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterComponent />
    </QueryClientProvider>
  );
}

export default App;
