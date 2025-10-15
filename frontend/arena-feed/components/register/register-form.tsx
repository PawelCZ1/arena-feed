import {useState} from 'react';
import {StyleSheet, View} from "react-native";
import ThemedTextInput from "@/components/themed-text-input";
import {ThemedText} from "@/components/themed-text";
import {VerticalSpacer} from "@/components/vertical-spacer";
import ThemedButton from "@/components/themed-button";

const RegisterForm = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const onRegister = () => {

    };

    return (
        <View style={styles.container}>
            <View>
                <ThemedText style={styles.text}>Username</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Type your username"
                />
            </View>

            <View>
                <ThemedText style={styles.text}>Email</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Type your email"
                />
            </View>

            <View>
                <ThemedText style={styles.text}>Password</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder="Type your password"
                />
                <VerticalSpacer size={8} />
                <ThemedTextInput
                    style={styles.input}
                    value={passwordConfirm}
                    secureTextEntry={true}
                    onChangeText={setPasswordConfirm}
                    placeholder="Retype your password"
                />
            </View>

            <View>
                <ThemedText style={styles.text}>First name</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="Type your first name"
                />
            </View>

            <View>
                <ThemedText style={styles.text}>Last name</ThemedText>
                <ThemedTextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Type your last name"
                />
            </View>
            <VerticalSpacer size={16} />
            <ThemedButton title={"Register"} style={styles.button}  onPress={onRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    text: {
        fontWeight: 'bold',
    },
    input: {
        width: 300,
    },
    button: {
        width: 150,
    }
});

export default RegisterForm;