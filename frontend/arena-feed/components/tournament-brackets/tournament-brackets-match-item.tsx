import React from 'react';
import {StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";
import {ThemedText} from "@/components/themed-text";
import {HorizontalDivider} from "@/components/horizontal-divider";

interface Props {
    lightColor?: string;
    darkColor?: string;
    round?: number;
    firstCompetitorName?: string | null;
    secondCompetitorName?: string | null;
    firstCompetitorScore?: number | null;
    secondCompetitorScore?: number | null;
    state?: 'New' | 'InProgress' | 'Finished';
}

const TournamentBracketsMatchItem = ({
                                         lightColor,
                                         darkColor,
                                         firstCompetitorName,
                                         secondCompetitorName,
                                         firstCompetitorScore,
                                         secondCompetitorScore,
                                         state = 'New',
                                         round = 1
                                     }: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    const successColor = useThemeColor({}, 'success'); // dopasuj do swojego motywu

    const firstScore = firstCompetitorScore ?? 0;
    const secondScore = secondCompetitorScore ?? 0;

    const isFinished = state === 'Finished';
    const firstIsWinner = isFinished && firstScore > secondScore;
    const secondIsWinner = isFinished && secondScore > firstScore;

    return (
        <View style={[{backgroundColor}, styles.container]}>
            <ThemedText type={"subtitle"}>{`Round: ` + round}</ThemedText>
            <HorizontalDivider thickness={1} />
            <View style={styles.rowContainer}>
                <View style={styles.nameContainer}>
                    <ThemedText
                        style={[
                            styles.text,
                            firstIsWinner && {
                                color: successColor
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {firstCompetitorName ?? 'Competitor 1'}
                    </ThemedText>
                </View>

                <View style={styles.scoreContainer}>
                    <ThemedText style={styles.text}>
                        {firstScore}
                    </ThemedText>
                    <ThemedText style={styles.text}>:</ThemedText>
                    <ThemedText style={styles.text}>
                        {secondScore}
                    </ThemedText>
                </View>

                <View style={styles.nameContainer}>
                    <ThemedText
                        style={[
                            styles.text,
                            {textAlign: 'right'},
                            secondIsWinner && {
                                color: successColor
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {secondCompetitorName ?? 'Competitor 2'}
                    </ThemedText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        margin: 16,
        padding: 16,
        gap: 12
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    secondRowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        width: "100%",
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
    stateRoundContainer: {
        flexDirection: "row",
        gap: 4,
    },
});

export default TournamentBracketsMatchItem;
