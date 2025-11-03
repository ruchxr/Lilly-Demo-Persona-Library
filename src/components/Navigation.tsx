import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  FolderOpen, 
  CheckSquare, 
  Settings, 
  BarChart3,
  LogOut
} from "lucide-react";

export const Navigation = () => {
  const navItems = [
    // { to: "/", label: "Dashboard", icon: BarChart3 },
    { to: "/personas", label: "Persona Library", icon: Users },
    // { to: "/drafts", label: "My Drafts", icon: FolderOpen },
    { to: "/mlr", label: "MLR Queue", icon: CheckSquare },
    // { to: "/admin", label: "Admin", icon: Settings }
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">NN</span>
              </div>
              <span className="text-lg font-semibold text-primary">
                <a href="/">
                  <img className="w-20 h-15" src="data:image/png;base64,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"></img>
                </a>
              </span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
