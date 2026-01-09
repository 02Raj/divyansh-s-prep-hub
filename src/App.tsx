import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import TopicPage from "./pages/TopicPage";
import BlogsPage from "./pages/BlogsPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ContributePage from "./pages/ContributePage";
import SnippetsPage from "./pages/SnippetsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/topics/:category" element={<TopicPage />} />
            <Route path="/topics/:category/:subcategory" element={<TopicPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="/snippets" element={<SnippetsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
