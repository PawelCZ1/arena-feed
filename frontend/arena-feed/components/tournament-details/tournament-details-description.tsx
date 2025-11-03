import React from 'react';
import {StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";
import {ThemedText} from "@/components/themed-text";

interface Props {
    lightColor?: string;
    darkColor?: string;
    description?: string;
}

const TournamentDetailsDescription = ({lightColor, darkColor, description}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <View style={[{backgroundColor}, styles.container]}>
            <ThemedText>
                {description || "No description provided."}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 16,
        alignItems: 'center',
        flex: 1
    }
});

export default TournamentDetailsDescription;