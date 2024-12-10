"use client";
import { createCustoms } from "@/lib/actions/customs-actions";
import { FaSave } from "react-icons/fa";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateCustomsForm({ userId, entry } : { userId: string, entry: any }) {
  const [state, action] = useFormState(createCustoms, {
    userId,
    entryId: entry.id,
    error: "",
  });

  return (
    <form className="space-y-6" action={action}>
      <Card className="mt-6 w-[600px] p-6">
        <CardTitle>
          <FormError message={state.error} />
        </CardTitle>
        <CardContent>
          <Label className="text-lg text-muted">Dorse Plakası</Label>
          <Input
            name="trailer"
            value={entry.trailer}
            disabled
            className="my-5 py-5"
          />
          <Textarea name="desc" placeholder="Gümrük Acıklama" autoFocus />
        </CardContent>
        <CardFooter>
          <SubmitButton>
            <FaSave size={24} /> <span className="pl-4"> Kaydet</span>
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
