'use client';

import { useState } from 'react';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    console.log({
      email,
      name,
      password,
    });
  }

  return (
    <section
      id="signup"
      className="px-4 py-16"
    >
      <div className="max-w-lg mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <h2 className="text-3xl font-black text-center mb-8">
            Criar conta grátis
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl"
            >
              Criar conta
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}