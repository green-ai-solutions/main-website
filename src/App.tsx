import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./contexts/theme-context";

import { Navigation } from "./components/layout/navigation";
import { Footer } from "./components/layout/footer";

import Home from "./pages/home";
import Services from "./pages/services";
import Solutions from "./pages/solutions";
import CaseStudies from "./pages/case-studies";
import CaseStudyDetail from "./pages/case-study-detail";
import About from "./pages/about";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import Careers from "./pages/careers";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300">
      <Navigation />
      <main className="pt-20">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/case-studies/:id" component={CaseStudyDetail} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route path="/careers" component={Careers} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
