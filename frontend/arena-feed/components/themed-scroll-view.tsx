import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/use-theme-color';

interface Props extends ScrollViewProps {
    children?: React.ReactNode;
    lightColor?: string;
    darkColor?: string;
}

export default function ThemedScrollView({ children, style, contentContainerStyle, lightColor, darkColor, ...props }: Props) {
    const insets = useSafeAreaInsets();
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return (
        <ScrollView
            style={[styles.container, { backgroundColor }, style]}
            contentContainerStyle={[
                { paddingTop: insets.top, paddingBottom: insets.bottom },
                contentContainerStyle,
            ]}
            {...props}
        >
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});