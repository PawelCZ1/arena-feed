import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedView from "@/components/themed-view";
import {ThemedText} from "@/components/themed-text";
import {StyleSheet} from "react-native";
import {VerticalSpacer} from "@/components/vertical-spacer";
import RegisterForm from "@/components/register/register-form";

const Register = () => {
    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.container}>
                <ThemedText type={"title"}>Register your account</ThemedText>
                <VerticalSpacer size={48}/>
                <RegisterForm/>
            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Register;