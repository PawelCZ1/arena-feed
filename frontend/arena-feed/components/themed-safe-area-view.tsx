import React from 'react';
import { StyleSheet } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useThemeColor} from "@/hooks/use-theme-color";

interface Props {
    children: React.ReactNode;
    style?: any;
    lightColor?: string;
    darkColor?: string;
}

export default function ThemedSafeAreaView({children, style, lightColor, darkColor }: Props) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: backgroundColor }, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});