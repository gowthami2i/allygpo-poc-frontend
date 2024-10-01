import "./app.scss";
import { QUERY_CONST } from "./constants/appConstants";
import { RouterComponent } from "./route/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        ...QUERY_CONST,
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
