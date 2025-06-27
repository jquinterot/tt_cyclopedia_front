import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppRouter } from "@/components/Router/AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" data-testid="app-root">
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <Router>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
            </Router>
          </LanguageProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
