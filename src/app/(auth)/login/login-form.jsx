'use client';

import {
  ArrowRightIcon,
  AtSignIcon,
  LockKeyholeIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


import { login } from '@/lib/actions/auth-actions';
import { lusitana } from '@/lib/fonts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { useFormState } from 'react-dom';
import { FormError } from '@/components/form-error';
import { SubmitButton } from '@/components/submit-button';


const LoginForm = () => {
  const [state, action] = useFormState(login, undefined);

  return (
    <Card>
      <form action={action}>
        <CardHeader>
          <FormError message={state?.error} />
          <CardTitle
            className={`${lusitana.className} pb-6 text-2xl text-center`}
          >
            Eposta ve şifre ile giriş yapınız.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative block ">
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
                required
                minLength={6}
              />
              <LockKeyholeIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <SubmitButton type="submit" className="mt-4 w-1/3 align-middle">
            Giriş <ArrowRightIcon className="ml-auto h-5 w-5  " />
          </SubmitButton>
          <Button variant="ghost" asChild className="mt-4 w-full text-center">
            <Link href={'/register'}>
              Hesabınız bulunmuyor mu? Burada kayıt olun.
            </Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
