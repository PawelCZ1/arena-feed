import React from 'react';
import {ThemedText} from "@/components/themed-text";
import ThemedTextInput from "@/components/themed-text-input";
import {StyleSheet, View} from "react-native";

interface Props {
    password: string;
    onChangePassword: (value: string) => void;
}
const FormLoginPasswordRow = ({password, onChangePassword}: Props) => {
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

export default FormLoginPasswordRow;