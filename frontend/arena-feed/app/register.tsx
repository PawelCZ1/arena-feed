import {ThemedText} from "@/components/themed-text";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import RegisterForm from "@/components/register/register-form";
import RegisterFooter from "@/components/register/register-footer";
import RegisterTopAppBar from "@/components/register/register-top-app-bar";
import {VerticalSpacer} from "@/components/vertical-spacer";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedView from "@/components/themed-view";
import ThemedScrollView from "@/components/themed-scroll-view";

const Register = () => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ThemedSafeAreaView>
                <RegisterTopAppBar/>
                <ThemedScrollView keyboardShouldPersistTaps='handled'>
                    <View style={styles.contentContainer}>
                        <ThemedText type={"title"}>Register your account</ThemedText>
                        <VerticalSpacer size={32}/>
                        <RegisterForm/>
                        <RegisterFooter/>
                    </View>
                </ThemedScrollView>
            </ThemedSafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    }
});

export default Register;