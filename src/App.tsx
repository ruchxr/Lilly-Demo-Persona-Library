import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PersonaLibrary from "./pages/PersonaLibrary";
import CreateDraft from "./pages/CreateDraft";
import DraftsDashboard from "./pages/DraftsDashboard";
import MLRQueue from "./pages/MLRQueue";
import Admin from "./pages/Admin";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Create_Persona from "./pages/CreatePersona";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<PersonaLibrary />} />
            <Route path="create_persona" element={<Create_Persona/>}/>
            <Route path="personas" element={<PersonaLibrary />} />
            <Route path="create" element={<CreateDraft />} />
            <Route path="drafts" element={<DraftsDashboard />} />
            <Route path="mlr" element={<MLRQueue />} />
            <Route path="admin" element={<Admin />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;