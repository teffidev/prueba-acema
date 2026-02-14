import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/Button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mt-4 mb-2">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe.
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
};
