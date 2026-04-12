import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import BlogPost4 from "./pages/BlogPost4";
import BlogPost5 from "./pages/BlogPost5";
import BlogPost6 from "./pages/BlogPost6";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import CookieBanner from "./components/CookieBanner";

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
      <Route path="/polityka-prywatnosci" component={PrivacyPolicy} />
      <Route path="/regulamin" component={Terms} />
      <Route path="/polityka-cookies" component={CookiePolicy} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
