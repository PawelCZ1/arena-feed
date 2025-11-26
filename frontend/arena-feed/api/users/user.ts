import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabase';

type UserProfile = {
    id: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    birthDate?: Date | null;
};

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const {data , error} = await supabase
        .schema('public')
        .from('profiles')
        .select('id, username, first_name, last_name, birth_date')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('getUserProfile error', error);
        return null;
    }
    if (!data) return null;
    return {
        id: data.id,
        username: data.username ?? null,
        firstName: data.first_name ?? null,
        lastName: data.last_name ?? null,
        birthDate: data.birth_date ? new Date(data.birth_date) : null,
    };
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
