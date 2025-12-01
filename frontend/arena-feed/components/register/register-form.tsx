import { useState } from "react";
import {ActivityIndicator, Alert, Platform, StyleSheet, View} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { VerticalSpacer } from "@/components/vertical-spacer";
import ThemedButton from "@/components/themed-button";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import FormRow from "@/components/form-row";
import FormPasswordColumn from "@/components/form-password-column";
import AndroidDatePicker from "@/components/android-date-picker";
import IOSDatePicker from "@/components/ios-date-picker";
import {supabase} from "@/api/supabase";
import {useRouter} from "expo-router";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const onDatePickerButtonPress = () => {
        setShowPicker((s) => !s);
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!email.trim() || !password.trim()) {
                setError("Type your email and password.");
                Alert.alert("Type your email and password.");
                return;
            }
            if (password !== passwordConfirm) {
                setError("Passwords are not the same.");
                Alert.alert("Passwords are not the same.");
                return;
            }

            const userMetadata = {
                username: username.trim() || undefined,
                firstName: firstName.trim() || undefined,
                lastName: lastName.trim() || undefined,
                birthDate: birthDate.toISOString().slice(0, 10), // YYYY-MM-DD
            };

            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password: password.trim(),
                options: {
                    data: userMetadata
                }
            });

            if (error) {
                setError(error.message);
                return;
            }

            if (!data.session) {
                Alert.alert("Please check your inbox for email verification!");
                router.replace("/login");
            }
        } catch (e: any) {
            setError(e?.message ?? "Error during registration.");
            Alert.alert(error || "Error during registration.");
        } finally {
            setLoading(false);
        }
    };

    const onAndroidChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // Android: dialog returns event.type 'set' when confirmed
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
        setShowPicker(false);
    };

    const onIOSChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    if (loading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FormRow
                inputName={"Username"}
                inputValue={username}
                onChangeText={setUsername}
                placeholder={"Type your username"}
            />
            <FormRow
                inputName={"Email"}
                inputValue={email}
                onChangeText={setEmail}
                placeholder={"Type your email"}
            />
            <FormPasswordColumn
                password={password}
                onChangePassword={setPassword}
                passwordConfirm={passwordConfirm}
                onChangePasswordConfirm={setPasswordConfirm}
            />
            <FormRow
                inputName={"First name"}
                inputValue={firstName}
                onChangeText={setFirstName}
                placeholder={"Type your first name"}
            />
            <FormRow
                inputName={"Last name"}
                inputValue={lastName}
                onChangeText={setLastName}
                placeholder={"Type your last name"}
            />

            <View style={styles.datePickerContainer}>
                <ThemedText style={[styles.text, { textAlign: "center" }]}>
                    Date of birth
                </ThemedText>

                {Platform.OS === "ios" ? (
                    <IOSDatePicker
                        date={birthDate}
                        showPicker={showPicker}
                        onDatePickerButtonPress={onDatePickerButtonPress}
                        onIOSChange={onIOSChange}
                    />
                ) : (
                    <AndroidDatePicker
                        date={birthDate}
                        showPicker={showPicker}
                        onDatePickerButtonPress={onDatePickerButtonPress}
                        onAndroidChange={onAndroidChange}
                    />
                )}
            </View>
            <VerticalSpacer size={16} />
            <ThemedButton
                title={"Register"}
                style={styles.button}
                onPress={handleRegister}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
    },
    text: {
        fontWeight: "bold",
    },
    input: {
        width: 300,
    },
    button: {
        width: 150,
    },
    datePickerContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default RegisterForm;