"use client";
import { FaSave } from "react-icons/fa";
import { useFormState } from "react-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "@/components/form-error";
import { createParkingRate } from "@/lib/actions/parking-rate-actions";
import { FormSuccess } from "@/components/form-success";

export default function CreateParkingRateForm() {
  const [state, action] = useFormState(createParkingRate, {
    error: "",
    message: "",
  });

  return (
    <form action={action}>
      <Card className="w-[600px] p-6">
        <CardTitle>
          <FormError message={state.error} />
          <FormSuccess message={state.message} />
        </CardTitle>
        <CardContent className="mt-5 flex flex-col gap-4">
          <Input
            id="rate"
            name="rate"
            type="number"
            step="0.01"
            placeholder="Park Saat Ücreti"
            autoFocus
          />
        </CardContent>
        <CardFooter>
          <SubmitButton type="submit">
            <FaSave size={24} /> <span className="pl-4">Oluştur</span>
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
