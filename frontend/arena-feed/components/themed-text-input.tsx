import React from 'react';
import {StyleSheet, TextInput} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";

interface Props {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    style?: object;
    lightColor?: string;
    darkColor?: string;
}

const ThemedTextInput = (
    {
        placeholder,
        value,
        onChangeText,
        secureTextEntry = false,
        keyboardType = 'default',
        style,
        lightColor,
        darkColor
    }: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <TextInput
            style={[styles.input, { backgroundColor: backgroundColor, color: textColor }, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            textContentType={'oneTimeCode'}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 8,
    },
});

export default ThemedTextInput;