'use client';
import { createEntry } from '@/lib/actions/entry-actions';
import { FaSave } from 'react-icons/fa';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEntrySchema } from '@/lib/schemas/entry-schemas';
import { DisplayServerResponse } from '@/components/display-server-response';

export function NewParkForm({ user, customers }) {
  const router = useRouter();
  const { execute, result, isExecuting } = useAction(createEntry);

  const form = useForm({
    resolver: zodResolver(CreateEntrySchema),
    defaultValues: {
      userId: user.id,
      trailer: '',
      truck: '',
      cargo: '',
      customerId: '',
      amount: 0,
      status: 'BEKLEMEDE',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="lg:w-[480px] ">
          <CardHeader>
            <DisplayServerResponse result={result} />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="trailer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Dorse Plakası"
                    />
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
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isExecuting}
                      placeholder="Çekici Plakası"
                    />
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
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isExecuting}
                      placeholder="Yükü"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Müşteri Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isExecuting}
                      placeholder="Alınan Ücret"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ödeme statusunu seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEKLEMEDE">BEKLEMEDE</SelectItem>
                      <SelectItem value="PAID">ÖDENDİ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isExecuting} type="submit">
              <FaSave size={24} /> <span className="pl-4"> Kaydet</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
