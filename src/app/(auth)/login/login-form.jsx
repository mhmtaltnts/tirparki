"use client";

import { ArrowRightIcon, AtSignIcon, LockKeyholeIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { login } from "@/lib/actions/auth-actions";
import { lusitana } from "@/lib/fonts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useFormState } from "react-dom";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [state, action] = useFormState(login, undefined);

  return (
    <Card className="w-full max-w-md">
      <form action={action}>
        <CardHeader>
          <CardTitle
            className={`${lusitana.className} text-center text-2xl font-bold`}
          >
            Giriş Yap
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FormError message={state?.error} />
          <div className="relative">
            <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="E-posta adresinizi giriniz"
              required
              className="pl-10"
            />
          </div>
          <div className="relative">
            <LockKeyholeIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Şifrenizi giriniz"
              required
              className="pl-10"
              minLength={6}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <SubmitButton
            variant="default"
            type="submit"
            className="flex w-full items-center justify-center gap-2"
          >
            <span>Giriş</span> <ArrowRightIcon className="ml-2 h-5 w-5" />
          </SubmitButton>
          <Button
            variant="link"
            asChild
            className="w-full text-sm text-gray-600 hover:text-gray-800"
          >
            <Link href={"/register"}>Şifreniz yoksa burada oluşturun.</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
