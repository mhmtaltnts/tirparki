'use client';
import { updateentry } from '@/lib/actions/entry-actions';
import { FaSave } from 'react-icons/fa';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DisplayServerResponse } from '@/components/display-server-response';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateentrySchema } from '@/lib/schemas/entry-schemas';
import { useAction } from 'next-safe-action/hooks';

export default function entryEditForm({ user, entry }) {
  const router = useRouter();
  const { execute, result, isExecuting } = useAction(updateentry);

  const form = useForm({
    resolver: zodResolver(UpdateentrySchema),
    defaultValues: {
      id: entry.id,
      trailer: entry.trailer,
      truck: entry.truck,
      customer: entry.customer,
      cargo: entry.cargo,
      userId: user.id,
    },
  });
  async function onSubmit() {
    execute(form.getValues());
    console.log(form.getValues());
    //location.reload();
    router.refresh(); // could grab a new timestamp from db
    form.reset(form.getValues());
    //router.push('/admin/users');
    // reset dirty fields
  }
  return (
    <Card className="w-[600px] mt-6">
      <DisplayServerResponse result={result} />
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="trailer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gorse</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isExecuting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="truck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>truck Çekiçi</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isExecuting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>customer</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isExecuting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yük</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isExecuting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isExecuting} type="submit">
              <FaSave size={24} /> <span className="pl-4"> Kaydet</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
