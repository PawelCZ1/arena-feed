import React from 'react';
import {useThemeColor} from "@/hooks/use-theme-color";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

interface Props {
    lightColor?: string;
    darkColor?: string;
    count?: number;
}

const TournamentDetailsParticipants = ({lightColor, darkColor, count}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    if (count === undefined || count === 0) {
        return (
            <View style={[{backgroundColor}, styles.container]}>
                <ThemedText style={styles.title}>
                    No participants yet
                </ThemedText>
            </View>
        );
    }
    return (
        <View style={[{backgroundColor}, styles.container]}>
            <ThemedText style={styles.title}>
                Participants
            </ThemedText>
            <ThemedText>
                {count}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    container: {
        borderRadius: 8,
        padding: 8,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default TournamentDetailsParticipants;