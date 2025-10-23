import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background">
      <Navigation />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};