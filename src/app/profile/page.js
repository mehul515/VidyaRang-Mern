"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error || !data?.session) return;

            const user = data.session.user;
            setUserData(user);
            setRole(user.user_metadata?.role || '');
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            setUserData(null);
            router.push('/login');
        }
    };

    const handleRoleUpdate = async (newRole) => {
        const { data, error } = await supabase.auth.updateUser({
            data: { role: newRole }
        });

        if (error) {
            console.error('Error updating role:', error.message);
        } else {
            setRole(newRole);
        }
    };

    if (!userData) return <p>Loading...</p>;

    const { email, full_name, avatar_url } = userData.user_metadata;


    const profilePicUrl = avatar_url?.startsWith('http') 
        ? avatar_url 
        :"/profile.png";
    return (
        <>
        
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="shadow-xl rounded-2xl p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <img
                        src={profilePicUrl}
                        alt="Profile Picture"
                        className="w-auto h-24 rounded-full mb-4"
                    />
                    <h1 className="text-2xl font-bold">{full_name || 'User'}</h1>
                    <p className="text-gray-500">{email}</p>
                    {role ? (
                        <span className="text-sm font-semibold text-green-600 mt-2">Role: {role}</span>
                    ) : (
                        <div className="mt-4 flex gap-4">
                            <button
                                onClick={() => handleRoleUpdate('Learner')}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Set as Learner
                            </button>
                            <button
                                onClick={() => handleRoleUpdate('Instructor')}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Set as Instructor
                            </button>
                        </div>
                    )}
                </div>

                

                <div className="mt-6">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}
