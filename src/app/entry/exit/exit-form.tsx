'use client';
import { FaSave } from 'react-icons/fa';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { createExit } from '@/lib/actions/exit-action';
import { SubmitButton } from '@/components/submit-button';
import { FormError } from '@/components/form-error';
import { useFormState } from 'react-dom';

export default function ExitForm({
  userId,
  entryId,
}: {
  userId: string;
  entryId: string;
}) {
  const [state, action] = useFormState(createExit, {
    userId,
    entryId,
    error: '',
  });

  return (
    <form action={action}>
      <Card className="w-[600px] p-6">
        <CardTitle>
          <FormError message={state.error} />
        </CardTitle>
        <CardContent className="flex flex-col mt-5 gap-4">
          <Input
            id="truck"
            name="truck"
            type="text"
            placeholder="Götüren Çekici Plakası"
            autoFocus
          />
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
