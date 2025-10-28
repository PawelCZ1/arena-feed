import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vhwmwrlmptonydpjuigh.supabase.co";
const supabasePublishableKey = "sb_publishable_2Sxz4XMSrP5vYT7R4fQN6Q_8RsSvn6k"

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
