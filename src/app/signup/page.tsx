'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@/component/TextInput';
import { useState } from 'react';

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(6, { message: 'Name must be at least 6 characters long' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Email must be valid' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be 6 characters long' }),
    confirmPassword: z.string({ required_error: 'Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords did not match',
    path: ['confirmPassword'],
  });

type TSignupSchema = z.infer<typeof signUpSchema>;

type ErrorResponse = { key: 'email' | 'confirmPassword'; message: string };

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<TSignupSchema>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [user, setUser] = useState<{ name: string; email: string }>();

  const onSubmit = async (data: TSignupSchema) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status > 200) {
      const error: ErrorResponse = await response.json();
      setError(error.key, { message: error.message });
      return;
    }

    const userResponse = await response.json();
    setUser(userResponse.user);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Card>
        <CardHeader title={!user ? 'Sign up' : 'User Data'} />
        {!user ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextInput
                type="text"
                control={control}
                name="name"
                label="Full Name"
              />
              <TextInput
                type="email"
                control={control}
                name="email"
                label="Email"
              />
              <TextInput
                type="password"
                control={control}
                name="password"
                label="Password"
              />
              <TextInput
                type="password"
                control={control}
                name="confirmPassword"
                label="Confirm Password"
              />
              <Button type="submit" variant="contained">
                Sign up
              </Button>
              <Typography>
                Already have an account?{' '}
                <MuiLink
                  href="/login"
                  component={Link}
                  sx={{ cursor: 'pointer' }}
                >
                  Login
                </MuiLink>
              </Typography>
            </CardContent>
          </form>
        ) : (
          <CardContent>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
          </CardContent>
        )}
      </Card>
    </Container>
  );
}
