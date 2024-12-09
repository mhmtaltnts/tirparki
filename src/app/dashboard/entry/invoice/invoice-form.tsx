"use client";
import { FormError } from "@/components/form-error";
import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInvoice } from "@/lib/actions/invoice-action";
import React from "react";
import { useFormState } from "react-dom";
import { FaSave } from "react-icons/fa";

type prevState = {
  entryId: string;
  userId: string;
  error: string;
};
export const InvoiceForm = ({ entryId, userId, invoice }) => {
  const [state, action] = useFormState(updateInvoice, {
    entryId: entryId,
    userId: userId,
    error: "",
  });
  return (
    <form action={action}>
      <Card className="w-[600px] p-6">
        <CardTitle>
          <FormError message={state.error} />
        </CardTitle>
        <CardContent className="flex flex-col gap-4">
          <Input
            id="amount"
            name="amount"
            type="number"
            defaultValue={invoice?.amount}
            autoFocus
          />
          <Select name="status" defaultValue={invoice?.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ödeme Durumu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PAID">ÖDENDİ</SelectItem>
              <SelectItem value="PENDING">BEKLEMEDE</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <SubmitButton>
            <FaSave size={24} /> <span className="pl-4"> Ödeme Yap</span>
          </SubmitButton>
        </CardFooter>
      </Card>
    </form>
  );
};
