'use client';

import { updateUser } from '@/lib/actions/user-actions';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

enum UserRole {
  USER = 'MİSAFİR',
  EMPLOYEE = 'ÇALIŞAN',
  OFFICIAL = 'MEMUR',
  MANAGER = 'YÖNETİÇi',
  ADMIN = 'KURUCU',
}

const UpdateUserForm = ({ user }) => {
  const [state, action] = useFormState(updateUser, {
    userId: user.id,
    role: 'USER',
    message: '',
    error: '',
  });
  const router = useRouter();

  return (
    <Card className="w-full mt-4">
      <CardTitle>
        <FormError message={state.error} />
        <FormSuccess message={state.message} />
      </CardTitle>
      <CardContent>
        <form action={action} className="flex flex-col gap-5 mt-8">
          <Select name="role">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rol" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(UserRole).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}{' '}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-4">
            <SubmitButton variant="destructive" type="submit">
              Kaydet
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateUserForm;
