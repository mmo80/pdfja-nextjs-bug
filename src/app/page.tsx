'use client';

import { runCode } from '@/actions/run-code';
import { Button } from '@/components/ui/button';
import { startTransition, useState } from 'react';

export default function Home() {
  const [theContent, saveTheContent] = useState<string>('');

  const runCodeHandler = async () => {
    const message = await runCode();
    console.log(message);
  };

  const doFetch = async () => {
    const url = `/api/pdf`;

    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    if (response.status !== 200) {
      console.log(`API request failed with status code: ${response.status}:`);
    }

    const data = await response.json();

    saveTheContent(data.content.replace(/\n/g, '<br>'));
  };

  return (
    <main className="flex flex-col gap-3 p-4">
      {/*
      // @ts-ignore*/}
      <Button onClick={() => startTransition(() => runCodeHandler())}>Server Action</Button>

      <Button onClick={doFetch}>Api Fetch</Button>

      <div
        className="w-full p-3 border border-1 border-stone-700 bg-stone-400 rounded-lg"
        dangerouslySetInnerHTML={{ __html: theContent }}
      ></div>
    </main>
  );
}
