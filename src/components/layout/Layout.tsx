import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { Button } from "../Button";
import { useAuth } from "../../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">
                ACEMA Ingeniería
              </h1>
            </div>
            {isAuthenticated && user && (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user.user.name.first} {user.user.name.last}
                  </p>
                  <p className="text-xs text-gray-500">{user.user.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2024 ACEMA Ingeniería - Sistema de Gestión de Usuarios
          </p>
        </div>
      </footer>
    </div>
  );
};
