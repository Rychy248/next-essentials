'use client';

import { authenticate, verifyMFA } from '@/app/lib/actions';
import { lusitana } from '@/app/ui/fonts';
import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, { message: '', error: '', otp: '' });
  const [mfaState, dispatchMFA] = useFormState(verifyMFA, undefined);
  const [showMFA, setShowMFA] = useState(false);

  useEffect(() => {
    console.log('Current state:', state);
    if (state.message === 'OTP_SENT') {
      setShowMFA(true);
      console.log('OTP sent:', state.otp);
    }
  }, [state]);

  useEffect(() => {
    console.log('MFA state:', mfaState);
    if (mfaState === 'success') {
      console.log('MFA verification successful');
      window.location.href = '/dashboard';
    } else if (mfaState) {
      console.log('MFA verification failed:', mfaState);
    }
  }, [mfaState]);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        {showMFA ? 'Enter OTP' : 'Please log in to continue.'}
      </h1>
      <form className="w-full" action={showMFA ? dispatchMFA : dispatch}>
        {!showMFA ? (
          <>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <LoginButton>Log in</LoginButton>
          </>
        ) : (
          <>
            <div className="w-full">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="otp"
              >
                OTP
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="otp"
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  required
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <LoginButton>Verify OTP</LoginButton>
          </>
        )}
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.error}</p>
            </>
          )}
          {state.message === 'OTP_SENT' && (
            <p className="text-sm text-green-500">OTP sent. Check the console for the OTP.</p>
          )}
          {mfaState && mfaState !== 'success' && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{mfaState}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

function LoginButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
 
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {children}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}