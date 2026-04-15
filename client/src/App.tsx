import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useCookies } from "./hooks/useCookies";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import BlogPost4 from "./pages/BlogPost4";
import BlogPost5 from "./pages/BlogPost5";
import BlogPost6 from "./pages/BlogPost6";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import Regulamin from "./pages/Regulamin";
import PolitykaCookies from "./pages/PolitykaCookies";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/1" component={BlogPost1} />
      <Route path="/blog/2" component={BlogPost2} />
      <Route path="/blog/3" component={BlogPost3} />
      <Route path="/blog/4" component={BlogPost4} />
      <Route path="/blog/5" component={BlogPost5} />
      <Route path="/blog/6" component={BlogPost6} />
      <Route path="/polityka-prywatnosci" component={PolitykaPrywatnosci} />
      <Route path="/regulamin" component={Regulamin} />
      <Route path="/polityka-cookies" component={PolitykaCookies} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize cookie consent and load scripts accordingly
  useCookies();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
