import { QUERY_CONST } from "./constants/appConstants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastProvider } from "./context/ToastContext";
import { HeaderProvider } from "./context/HeaderContext";
import { RouterComponent } from "./routes/AppRouter";

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
          <ToastProvider>
            <RouterComponent />
          </ToastProvider>
        </HeaderProvider>
    </QueryClientProvider>
  );
}

export default App;
