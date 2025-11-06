import { useState } from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Platform} from "react-native";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import LoginTopAppBar from "@/components/login/login-top-app-bar";
import ThemedScrollView from "@/components/themed-scroll-view";
import {ThemedText} from "@/components/themed-text";
import FormRow from "@/components/form-row";
import FormLoginPasswordRow from "@/components/form-login-password-row";
import ThemedTextButton from "@/components/themed-text-button";
import ThemedButton from "@/components/themed-button";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

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
                        <FormRow inputName={"Username"} inputValue={username} onChangeText={setUsername}/>
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
        textAlign: "center"
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