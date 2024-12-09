"use client";
import { FaSave } from "react-icons/fa";
import { useFormState } from "react-dom";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "@/components/form-error";
import { updateParkingRate } from "@/lib/actions/parking-rate-actions";

export default function UpdateParkingRateForm({ parkingRate }) {
  const [state, action] = useFormState(updateParkingRate, {
    id: parkingRate.id,
    error: "",
  });

  return (
    <form action={action}>
      <Card className="w-[600px] p-6">
        <CardTitle>
          <FormError message={state.error} />
        </CardTitle>
        <CardContent className="mt-5 flex flex-col gap-4">
          <Input
            id="rate"
            name="rate"
            type="number"
            step="0.01"
            defaultValue={parkingRate.rate}
            placeholder="Hourly Rate"
            autoFocus
          />
        </CardContent>
        <CardFooter>
          <SubmitButton type="submit">
            <FaSave size={24} /> <span className="pl-4">Update Rate</span>
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
