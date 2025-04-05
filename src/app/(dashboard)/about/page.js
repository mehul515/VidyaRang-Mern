"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/app/supabaseClient';
import Aboutmain from "@/components/Aboutmain";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get session from Supabase
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.push('/login'); // Redirect if no session
      } else {
        setLoading(false);
      }
    };

    fetchSession();

    // Set up a listener for session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        router.push('/login'); // Redirect if session changes to null
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      subscription?.unsubscribe(); // Properly unsubscribe
    };
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <Aboutmain />;
}