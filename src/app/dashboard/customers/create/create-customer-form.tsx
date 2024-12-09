"use client";

import { FaSave } from "react-icons/fa";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DisplayServerResponse } from "@/components/display-server-response";

import { createCustomer } from "@/lib/actions/customer-actions";
import { CreateUserSchema } from "@/lib/schemas/user-schemas";
import Link from "next/link";
import { User } from "@prisma/client";

export function CreateCustomerForm({ user }: { user: User }) {
  const router = useRouter();
  const { execute, result, isExecuting } = useAction(createCustomer);

  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      userId: user.id,
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
    execute(form.getValues());
    router.refresh(); // could grab a new timestamp from db
    form.reset(form.getValues());
    //router.push('/admin/users');
  };

  //const [state, formAction] = useFormState(addNoteById, undefined);

  return (
    <Card className="mt-4 w-[600px] p-6">
      <DisplayServerResponse result={result} />
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Müşteri ve customer Adı"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isExecuting}
                      placeholder="Müşteri eposta adresi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isExecuting}
                      placeholder="Adresi"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      disabled={isExecuting}
                      placeholder="Müşteri telefon Numarası"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/dashboard/customers">İptal</Link>
              </Button>

              <Button disabled={isExecuting} type="submit">
                <FaSave size={24} /> <span className="pl-4"> Kaydet</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
