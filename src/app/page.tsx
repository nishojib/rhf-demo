'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Button variant="contained" onClick={() => router.push('/signup')}>
      Signup
    </Button>
  );
}
