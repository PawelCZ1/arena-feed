import {ThemedText} from "@/components/themed-text";
import ThemedTextInput from "@/components/themed-text-input";
import {VerticalSpacer} from "@/components/vertical-spacer";
import {StyleSheet, View} from "react-native";

interface Props {
    password: string;
    onChangePassword: (value: string) => void;
    passwordConfirm: string;
    onChangePasswordConfirm: (value: string) => void;
}

const FormPasswordColumn = ({password, onChangePassword, passwordConfirm, onChangePasswordConfirm}: Props) => {
    return (
        <View>
            <ThemedText style={styles.text}>Password</ThemedText>
            <ThemedTextInput
                style={styles.input}
                value={password}
                onChangeText={onChangePassword}
                secureTextEntry={true}
                placeholder="Type your password"
            />
            <VerticalSpacer size={8} />
            <ThemedTextInput
                style={styles.input}
                value={passwordConfirm}
                secureTextEntry={true}
                onChangeText={onChangePasswordConfirm}
                placeholder="Retype your password"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
    input: {
        width: 300,
    }
});

export default FormPasswordColumn;