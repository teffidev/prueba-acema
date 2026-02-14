import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useUsersContext } from "../../../hooks/useUsersContext";
import { authService } from "../services/authServices";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const { login } = useAuth();
  const { users, loading } = useUsersContext();
  const navigate = useNavigate();

  // Auto-rellenar con el primer usuario cuando carguen los datos
  useEffect(() => {
    if (users.length > 0 && !email) {
      setEmail(users[0].user.email);
      setPassword(users[0].user.password);
    }
  }, [users, email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoginError("");

    const validation = authService.validateCredentials({ email, password });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      const success = await login({ email, password });

      if (success) {
        navigate("/dashboard");
      } else {
        setLoginError(
          "Credenciales inválidas. Por favor, verifica tu email y contraseña.",
        );
      }
    } catch (error) {
      setLoginError("Error al iniciar sesión. Por favor, intenta de nuevo.");
      console.error("Error al iniciar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setShowCredentials(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg px-8 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{loginError}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading || loading}>
            {loading ? "Cargando usuarios..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* Sección de ayuda con credenciales */}
        <div className="mt-6">
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setShowCredentials(!showCredentials)}
            disabled={loading || users.length === 0}>
            {showCredentials
              ? "🔒 Ocultar credenciales"
              : "🔑 Ver credenciales disponibles"}
          </Button>

          {showCredentials && users.length > 0 && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              <p className="text-sm font-semibold text-blue-900 mb-3">
                Usuarios disponibles (click para usar):
              </p>
              <div className="space-y-2">
                {users.slice(0, 10).map((user, index) => (
                  <div
                    key={user.user.email}
                    className="bg-white p-3 rounded border border-blue-200 hover:border-blue-400 cursor-pointer transition-colors"
                    onClick={() =>
                      fillCredentials(user.user.email, user.user.password)
                    }>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-blue-600">
                        Usuario #{index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.user.name.first} {user.user.name.last}
                      </span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>
                        <span className="font-medium text-gray-700">
                          Email:
                        </span>{" "}
                        <span className="text-gray-600">{user.user.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          Password:
                        </span>{" "}
                        <span className="font-mono text-gray-600">
                          {user.user.password}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {users.length > 10 && (
                <p className="text-xs text-blue-700 mt-3 text-center">
                  Mostrando 10 de {users.length} usuarios disponibles
                </p>
              )}
            </div>
          )}
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-800 font-medium mb-2">
            ✅ ¡Listo para usar!
          </p>
          <p className="text-xs text-green-700">
            {loading
              ? "Cargando usuarios de la API..."
              : users.length > 0
                ? `${users.length} usuarios cargados. Los campos ya están pre-llenados con un usuario válido.`
                : 'Click en "Ver credenciales" para ver usuarios disponibles.'}
          </p>
        </div>
      </div>
    </div>
  );
};
