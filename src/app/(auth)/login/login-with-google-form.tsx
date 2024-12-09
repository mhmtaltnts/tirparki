"use client";
import React from "react";
import { lusitana } from "@/lib/fonts";
import { handleGoogleLogin } from "@/lib/actions/auth-actions";
import { FcGoogle } from "react-icons/fc";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";

export default function LoginWithGoogleForm() {
  const [state, action] = useFormState(handleGoogleLogin, undefined);
  return (
    <Card className="w-full max-w-md">
      <form action={action}>
        <CardHeader>
          <CardTitle
            className={`${lusitana.className} text-center text-2xl font-bold`}
          >
            Google ile Giriş
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4"></CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton
            variant="link"
            type="submit"
            className="flex w-full items-center justify-center gap-2"
          >
            <FcGoogle size={40} />
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
