import { NextResponse } from 'next/server';

type User = {
  name: string;
  email: string;
  password: string;
};

const DATA: User[] = [
  {
    name: 'Nurul Islam',
    email: 'nishojib@gmail.com',
    password: 'secret',
  },
];

export async function POST(request: Request) {
  const data = await request.json();
  const users = DATA.map((user) => user.email);

  if (users.includes(data.email)) {
    return new Response(
      JSON.stringify({ key: 'email', message: 'User already exists' }),
      {
        status: 401,
      },
    );
  }

  if (data.password !== data.confirmPassword) {
    return new Response(
      JSON.stringify({
        key: 'confirmPassword',
        message: "Password doesn't match",
      }),
      {
        status: 402,
      },
    );
  }

  const user: User = {
    name: data.name,
    email: data.email,
    password: data.password,
  };

  DATA.push(user);

  return NextResponse.json({ message: 'success', user: user });
}
