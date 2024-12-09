import LoginForm from "./login-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSignInForm } from "./login-with-email-form";

import LoginWithGoogleForm from "./login-with-google-form";

const LoginPage = async () => {
  return (
    <main className="mt-5 flex min-h-screen w-full flex-col items-center justify-start">
      <Tabs defaultValue="google-login " className="max-w-[500px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="google-login">Google ile giriş</TabsTrigger>
          <TabsTrigger value="email-login">E-posta ile giriş</TabsTrigger>
          <TabsTrigger value="credential-login">Şifre ile giriş</TabsTrigger>
        </TabsList>
        <TabsContent value="google-login" className="h-[400px]">
          <LoginWithGoogleForm />
        </TabsContent>
        <TabsContent value="email-login" className="h-[400px]">
          <EmailSignInForm />
        </TabsContent>
        <TabsContent value="credential-login" className="h-[400px]">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default LoginPage;
