import LoginForm from './login-form';
import { handleGoogleLogin } from '@/lib/actions/auth-actions';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage = async () => {
  return (
    <main className="flex justify-center items-center min-h-screen w-full">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <form
            action={handleGoogleLogin}
            className="flex items-center justify-center"
          >
            <Button
              variant="outline"
              type="submit"
              className="flex items-center justify-center gap-3"
            >
              <FcGoogle size={30} />
              <span>Giriş Yapınız</span>
            </Button>
          </form>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
