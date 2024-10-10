import "./app.scss";
import { QUERY_CONST } from "./constants/appConstants";
import { HeaderProvider } from "./hook/useHeader";
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
      <HeaderProvider>
        <RouterComponent />
      </HeaderProvider>
    </QueryClientProvider>
  );
}

export default App;
