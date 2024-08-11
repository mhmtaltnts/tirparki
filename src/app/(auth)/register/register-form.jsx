'use client';

import { SquareUserRound } from 'lucide-react';
import { register } from '@/lib/actions/auth-actions';

import { FormError } from '@/components/form-error';
import { AtSignIcon, LockKeyholeIcon, SaveAllIcon } from 'lucide-react';
import { SubmitButton } from '@/components/submit-button';
import { useFormState } from 'react-dom';

const RegisterForm = () => {
  const [state, action] = useFormState(register, { error: '' });

  return (
    <form action={action}>
      <div className="flex flex-col gap-4 flex-1 rounded-lg items-center px-6 pb-4 pt-8">
        <FormError message={state?.error} />
        <div className="w-full flex flex-col gap-6">
          <div className="relative block">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2"
              id="name"
              type="text"
              name="name"
              placeholder="Adınızı ve soyadınız giriniz"
              required
            ></input>
            <SquareUserRound className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="relative block">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2"
              id="email"
              type="email"
              name="email"
              placeholder="E posta adresinizi giriniz"
              required
            ></input>
            <AtSignIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="mt-4">
            <div className="relative w-full">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2"
                id="password"
                type="password"
                name="password"
                placeholder="Şifrenizi giriniz"
                required
                minLength={6}
              />
              <LockKeyholeIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <SubmitButton type="submit" className="mt-4 w-1/3 align-middle">
          Kaydet <SaveAllIcon className="ml-auto h-5 w-5  " />
        </SubmitButton>
      </div>
    </form>
  );
};

export default RegisterForm;
