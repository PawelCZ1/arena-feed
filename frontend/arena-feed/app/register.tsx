import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedView from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";
import {KeyboardAvoidingView, Platform, StyleSheet, ScrollView} from "react-native";
import RegisterForm from "@/components/register/register-form";
import RegisterFooter from "@/components/register/register-footer";
import RegisterTopAppBar from "@/components/register/register-top-app-bar";

const Register = () => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
                <ThemedSafeAreaView>
                    <RegisterTopAppBar/>
                    <ScrollView
                        style={{ flex: 1 }}
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <ThemedView style={styles.container}>
                            <ThemedText type={"title"}>Register your account</ThemedText>
                            <RegisterForm/>
                            <RegisterFooter/>
                        </ThemedView>
                    </ScrollView>
                </ThemedSafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    }
});

export default Register;