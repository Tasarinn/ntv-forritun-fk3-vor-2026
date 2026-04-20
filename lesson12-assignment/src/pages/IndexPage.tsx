import React, { useState } from 'react';


function CrashyComponent(): React.ReactElement {
  throw new Error('Crash during render');
}

export function IndexPage() {
  const [shouldCrash, setShouldCrash] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-4xl font-bold">Verkefni 12</h1>
      <p className="mt-2 text-gray-600">
        Use the buttons below to test all error handling layers.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={() => setShouldCrash(true)}
          className="w-fit rounded border px-4 py-2 hover:bg-gray-100"
        >
          Crash on next render
        </button>

        <button
          onClick={() => {
            Promise.reject(new Error('Unhandled promise rejection test'));
          }}
          className="w-fit rounded border px-4 py-2 hover:bg-gray-100"
        >
          Unhandled promise rejection
        </button>

        <button
          onClick={() => {
            setTimeout(() => {
              throw new Error('setTimeout error test');
            }, 0);
          }}
          className="w-fit rounded border px-4 py-2 hover:bg-gray-100"
        >
          Throw from setTimeout
        </button>
      </div>

      {shouldCrash ? <CrashyComponent /> : null}
    </main>
  );
}