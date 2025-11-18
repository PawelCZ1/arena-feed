import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabase';

type UserProfile = {
    id: string;
    username?: string | null;
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const res = await supabase
        .schema('public')
        .from('profiles')
        .select('id, username')
        .eq('id', userId)
        .single();

    if (res.error) {
        console.error('getUserProfile error', res.error);
        return null;
    }
    return (res.data as UserProfile) ?? null;
}

export function useUserProfile(userId?: string | null) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;
        if (!userId) {
            setProfile(null);
            return;
        }

        setLoading(true);
        getUserProfile(userId)
            .then((p) => {
                if (!mounted) return;
                setProfile(p);
            })
            .catch((e) => {
                console.error(e);
                if (mounted) setProfile(null);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [userId]);

    return { profile, loading };
}
