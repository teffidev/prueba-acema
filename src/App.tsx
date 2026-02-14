import { UsersProvider } from "./context/UsersContext";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <UsersProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </UsersProvider>
  );
}

export default App;
