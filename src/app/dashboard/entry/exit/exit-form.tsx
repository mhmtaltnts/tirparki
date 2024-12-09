"use client";
import { FaSave } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createExit } from "@/lib/actions/exit-action";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "@/components/form-error";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  UserCircleIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { formatAmount } from "@/lib/utils";

export default function ExitForm({
  userId,
  entry,
  entryTime,
  hourlyRate,
}: {
  userId: string;
  entry: any;
  entryTime: Date;
  hourlyRate: number;
  invoice: any;
}) {
  const [state, action] = useFormState(createExit, {
    userId,
    entryId: entry.id,
    error: "",
  });

  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const calculateDuration = () => {
      const now = new Date();
      const diffHours =
        (now.getTime() - entryTime.getTime()) / (1000 * 60 * 60);

      setDuration(Math.ceil(diffHours));
    };

    const calculateAmount = () => {
      hourlyRate && setAmount(hourlyRate * duration);
    };
    calculateAmount();
    calculateDuration();
    const timer = setInterval(calculateDuration, 6000);

    return () => {
      clearInterval(timer);
    };
  }, [entryTime, duration, hourlyRate]);

  return (
    <form action={action}>
      <Card className="w-[600px] p-6">
        <CardTitle>
          <FormError message={state.error} />
        </CardTitle>
        <CardDescription>
          <span>Geçen Süre: {duration.toFixed(2)} saat</span>
          <br />
          <span>Ödeme Miktarı: {formatAmount(amount)}</span>
        </CardDescription>
        <CardContent className="mt-5 flex flex-col gap-4">
          <Label> Dorse Plakası</Label>
          <Input
            id={entry.id}
            name="trailer"
            type="text"
            defaultValue={entry.trailer}
            disabled
          />{" "}
          <Input
            id="truck"
            name="truck"
            type="text"
            placeholder="Götüren Çekici Plakası"
            autoFocus
          />
          <Input
            id="amount"
            name="amount"
            type="number"
            defaultValue={amount.toFixed(2)}
          />
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Ödeme durumunu seçin
            </legend>
            <div className="rounded-md border px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <Input
                    id="pending"
                    name="status"
                    type="radio"
                    value="PENDING"
                    className={cn(
                      "h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 px-0 py-0",
                      "checked:border-primary checked:bg-primary",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      "transition-colors duration-200",
                    )}
                  />
                  <label
                    htmlFor="pending"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  >
                    Beklemede <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <Input
                    id="paid"
                    name="status"
                    type="radio"
                    value="PAID"
                    className={cn(
                      "h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-gray-300 px-0 py-0",
                      "checked:border-primary checked:bg-primary",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      "transition-colors duration-200",
                    )}
                  />
                  <label
                    htmlFor="paid"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                  >
                    Ödendi <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </CardContent>
        <CardFooter>
          <SubmitButton type="submit">
            <FaSave size={24} /> <span className="pl-4"> Kaydet</span>
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
}
