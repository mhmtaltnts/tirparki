'use client';
import { updateEntry } from '@/lib/actions/entry-actions';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DisplayServerResponse } from '@/components/display-server-response';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateEntrySchema } from '@/lib/schemas/entry-schemas';
import { useAction } from 'next-safe-action/hooks';

export default function EntryEditForm({ userId, entry, customers }) {
  const router = useRouter();
  const { execute, result, isExecuting } = useAction(updateEntry);

  const form = useForm({
    resolver: zodResolver(UpdateEntrySchema),
    defaultValues: {
      id: entry.id,
      trailer: entry.trailer,
      truck: entry.truck,
      customerId: entry.customerId || null,
      cargo: entry.cargo,
      desc: entry.customs?.desc || '',
      userId: userId,
      amount: entry.amount || 0,
      status: entry.status || 'PENDING',
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
      <CardHeader>
        <DisplayServerResponse result={result} />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="trailer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-6 text-slate-400">Dorse</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      value={field.value}
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
                  <FormLabel className="pl-6  text-slate-400">Çekiçi</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      value={field.value}
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
                  <FormLabel className="pl-6  text-slate-400">
                    Müşteri
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-6  text-slate-400">Yükü</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      disabled={isExecuting}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-6  text-slate-400">
                    Gümrük Bilgi
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      disabled={isExecuting}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-6  text-slate-400">
                    Ödeme Miktarı
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value}
                      disabled={isExecuting}
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
                <FormItem className="space-y-6">
                  <FormLabel className="pl-6  text-slate-400">
                    Ödeme Durumu Seçiniz
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PENDING" />
                        </FormControl>
                        <FormLabel className="font-normal">BEKLEMEDE</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PAID" />
                        </FormControl>
                        <FormLabel className="font-normal">ÖDENDİ</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isExecuting} type="submit">
              <FaSave size={24} /> <span className="pl-4"> Kaydet</span>
            </Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
