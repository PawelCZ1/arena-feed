import React from 'react';
import {StyleSheet, TextInput, TextInputContentSizeChangeEvent} from 'react-native';
import {useThemeColor} from '@/hooks/use-theme-color';

interface Props {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    style?: object;
    lightColor?: string;
    darkColor?: string;
    multiline?: boolean;
    numberOfLines?: number;
    textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
    onContentSizeChange?: (e: TextInputContentSizeChangeEvent) => void;
}

const ThemedTextInput = ({
                             placeholder,
                             value,
                             onChangeText,
                             secureTextEntry = false,
                             multiline = false,
                             keyboardType = 'default',
                             style,
                             lightColor,
                             darkColor,
                             numberOfLines,
                             textAlignVertical,
                             onContentSizeChange
                         }: Props) => {
    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'surface');
    const textColor = useThemeColor({light: lightColor, dark: darkColor}, 'text');
    const borderColor = useThemeColor({light: lightColor, dark: darkColor}, 'border');

    return (
        <TextInput
            style={[styles.input, {backgroundColor, color: textColor, borderColor}, style]}
            placeholder={placeholder}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={textAlignVertical}
            onContentSizeChange={onContentSizeChange}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            textContentType="oneTimeCode"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 8,
        borderWidth: 0.25
    }
});

export default ThemedTextInput;
