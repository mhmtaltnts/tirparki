"use client";

import { updateProfile } from "@/lib/actions/user-actions";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type User } from "@prisma/client";

const UpdateProfileForm = ({ user }: { user: User }) => {
  const [state, action] = useFormState(updateProfile, {
    userId: user.id,
    email: user.email,
    message: "",
    error: "",
  });
  const router = useRouter();

  return (
    <Card className="mt-4 w-full max-w-md space-x-6">
      <CardTitle>
        <FormError message={state.error} />
        <FormSuccess message={state.message} />
      </CardTitle>
      <CardContent>
        <form action={action} className="mt-8 flex flex-col gap-6">
          <Label>
            E-posta
            <Input
              className="mt-4"
              name="email"
              type="email"
              defaultValue={user.email}
              disabled
            />
          </Label>
          <Label>
            Adı
            <Input
              className="mt-4"
              name="name"
              type="text"
              defaultValue={user.name as string}
            />
          </Label>
          <Label>
            Adres
            <Input
              className="mt-4"
              name="address"
              type="address"
              defaultValue={user.address as string}
            />
          </Label>
          <Label>
            Telefon
            <Input
              className="mt-4"
              name="phone"
              type="tel"
              defaultValue={user.phone as string}
            />
          </Label>
          <div className="mt-4">
            <SubmitButton variant="default" type="submit">
              Kaydet
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateProfileForm;
