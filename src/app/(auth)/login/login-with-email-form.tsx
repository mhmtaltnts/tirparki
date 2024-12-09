"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { lusitana } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AtSignIcon, ArrowRightIcon } from "lucide-react";
import { loginWithEmail } from "@/lib/actions/auth-actions";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const EmailSignInForm = ({ className, ...props }: UserAuthFormProps) => {
  const [state, action] = useFormState(loginWithEmail, {
    error: "",
    success: "",
  });

  return (
    <Card className="w-full max-w-md">
      <form action={action} className="space-y-4">
        <CardHeader>
          <CardTitle
            className={`${lusitana.className} text-center text-2xl font-bold`}
          >
            E-posta ile Giriş
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormError message={state.error} />
          <FormSuccess message={state.success} />
          <div className="relative">
            <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="email2"
              name="email"
              placeholder="ali@ornek.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="pl-10"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton
            variant="default"
            type="submit"
            className="flex w-full items-center justify-center gap-2"
          >
            <span>Giriş</span> <ArrowRightIcon className="ml-2 h-5 w-5" />
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
};
