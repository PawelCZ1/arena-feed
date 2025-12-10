import React from 'react';
import {StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";
import {ThemedText} from "@/components/themed-text";

interface Props {
    lightColor?: string;
    darkColor?: string;
    firstCompetitorName?: string | null;
    secondCompetitorName?: string | null;
    firstCompetitorScore?: number | null;
    secondCompetitorScore?: number | null;
}

const TournamentBracketsMatchItem = ({lightColor, darkColor, firstCompetitorName, secondCompetitorName, firstCompetitorScore, secondCompetitorScore}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <View style={[{backgroundColor}, styles.container]}>
            <View style={styles.nameContainer}>
                <ThemedText style={styles.text} numberOfLines={1}>
                    {firstCompetitorName ?? 'Competitor 1'}
                </ThemedText>
            </View>

            <View style={styles.scoreContainer}>
                <ThemedText style={styles.text}>
                    {firstCompetitorScore ?? '0'}
                </ThemedText>
                <ThemedText style={styles.text}>:</ThemedText>
                <ThemedText style={styles.text}>
                    {secondCompetitorScore ?? '0'}
                </ThemedText>
            </View>

            <View style={styles.nameContainer}>
                <ThemedText style={[styles.text, {textAlign: 'right'}]} numberOfLines={1}>
                    {secondCompetitorName ?? 'Competitor 2'}
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 8,
        padding: 8,
        alignItems: "center",
    },
    nameContainer: {
        flex: 1,
    },
    scoreContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    text: {
        fontWeight: "bold",
    },
});

export default TournamentBracketsMatchItem;
