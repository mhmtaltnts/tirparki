'use client';
import { createCustoms } from '@/lib/actions/customs-actions';
import { FaSave } from 'react-icons/fa';
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useFormState } from 'react-dom';
import { FormError } from '@/components/form-error';
import { SubmitButton } from '@/components/submit-button';

export default function CreateCustomsForm({ userId, entryId }) {
  const [state, action] = useFormState(createCustoms, {
    userId,
    entryId,
    error: '',
  });

  return (
    <form className="space-y-6" action={action}>
      <Card className="w-[600px] mt-6 p-6">
        <CardTitle>
          <FormError message={state.error} />
        </CardTitle>
        <CardContent>
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
