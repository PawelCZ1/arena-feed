import { useState } from 'react';
import {Alert, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Platform} from "react-native";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import LoginTopAppBar from "@/components/login/login-top-app-bar";
import ThemedScrollView from "@/components/themed-scroll-view";
import {ThemedText} from "@/components/themed-text";
import FormRow from "@/components/form-row";
import FormLoginPasswordRow from "@/components/form-login-password-row";
import ThemedTextButton from "@/components/themed-text-button";
import ThemedButton from "@/components/themed-button";
import {supabase} from "@/api/supabase";
import {useAuth} from "@/api/auth/auth-provider";
import {useRouter} from "expo-router";

const Login = () => {
    const router = useRouter();
    const { signIn, loading: authLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        setLocalLoading(true);
        try {
            await signIn(email, password);
            Alert.alert("Success", "You have been logged in successfully.", [
                ({ text: "OK", onPress: () => router.replace("/main") }),
            ]);
        } catch (e) {
            console.error(e);
            setError("An unexpected error occurred.");
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ThemedSafeAreaView>
                <LoginTopAppBar/>
                <ThemedText type={"title"} style={styles.header}>Log In</ThemedText>
                <ThemedScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.contentContainer}>
                    <View>
                        <FormRow inputName={"Email"} placeholder={"Type your email"} inputValue={email} onChangeText={setEmail}/>
                        <FormLoginPasswordRow password={password} onChangePassword={setPassword} />
                    </View>
                    <ThemedButton style={styles.button} title={"Log In"} onPress={handleLogin}/>
                </ThemedScrollView>
            </ThemedSafeAreaView>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        textAlign: "left",
        paddingStart: 16,
        paddingTop: 48
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16
    },
    button: {
        width: 150,
    },
});

export default Login;