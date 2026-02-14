import { Layout } from "../components/layout/Layout";
import { LoginForm } from "../features/auth/components/LoginForm";


export const LoginPage = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <LoginForm />
      </div>
    </Layout>
  );
};
