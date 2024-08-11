import RegisterForm from '@/app/(auth)/register/register-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterPage = () => {
  return (
    <main className="flex justify-center items-center h-screen w-full ">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-base text-center">
            Kullanıcı Kayıdı.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
