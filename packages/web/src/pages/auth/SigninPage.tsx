import React from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { auth } from '@/firebase';

export default function SigninPage() {
    const [codeSentResult, setCodeSentResult] = React.useState<ConfirmationResult | null>(null);

    return (
        <div className="w-dvw h-dvh flex">
            {!codeSentResult ? (
                <PhoneNumberForm onCodeSent={setCodeSentResult} />
            ) : (
                <CodeForm codeSentResult={codeSentResult} />
            )}
        </div>
    );
}

function PhoneNumberForm({ onCodeSent }: { onCodeSent: (result: ConfirmationResult) => void }) {
    const { register, handleSubmit } = useForm();
    const { t } = useTranslation();
    const id = React.useId();

    const onSubmit = handleSubmit(async (data) => {
        const verifier = new RecaptchaVerifier(auth, id, {
            size: 'invisible',
        });

        let result;
        try {
            result = await signInWithPhoneNumber(auth, '+44' + data.phone, verifier);
        } catch (error) {
            console.log(error);
            return;
        }

        onCodeSent(result);
    });

    return (
        <form className="max-w-lg w-full m-auto flex flex-col" onSubmit={onSubmit}>
            <h1 className="text-4xl mb-10">{t('welcome')}</h1>

            <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-neutral-200 rounded-md">+84</div>
                    <input
                        className="border-2 flex-1 outline-none border-neutral-200 p-3 rounded-md placeholder:text-neutral-400 focus:border-orange-500"
                        placeholder="Phone number"
                        {...register('phone')}
                    />
                </div>

                <button
                    id={id}
                    className="p-3 bg-orange-500 rounded-md text-white hover:bg-orange-600 active:bg-orange-700"
                >
                    {t('continue')}
                </button>
            </div>
        </form>
    );
}

function CodeForm({ codeSentResult }: { codeSentResult: ConfirmationResult }) {
    const { register, handleSubmit } = useForm();
    const { t } = useTranslation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await codeSentResult.confirm(data.code);
        } catch (error) {
            console.log(error);
            return;
        }
    });

    return (
        <form className="max-w-lg w-full m-auto flex flex-col" onSubmit={onSubmit}>
            <h1 className="text-4xl mb-10">{t('confirmNumber')}</h1>

            <div className="flex flex-col gap-2">
                <input
                    className="border-2 flex-1 outline-none border-neutral-200 p-3 rounded-md placeholder:text-neutral-400 focus:border-orange-500"
                    placeholder="Confirmation code"
                    {...register('code')}
                />

                <button className="p-3 bg-orange-500 rounded-md text-white hover:bg-orange-600 active:bg-orange-700">
                    {t('continue')}
                </button>
            </div>
        </form>
    );
}
