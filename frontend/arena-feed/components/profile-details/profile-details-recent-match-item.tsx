import React from 'react';
import {useThemeColor} from "@/hooks/use-theme-color";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import {HorizontalDivider} from "@/components/horizontal-divider";
import {useRouter} from "expo-router";

interface Props {
    lightColor?: string;
    darkColor?: string;
    tournamentId?: string | number;
    tournamentState?: TournamentState;
    tournamentName?: string;
    round?: number;
    firstCompetitorName?: string | null;
    secondCompetitorName?: string | null;
    firstCompetitorScore?: number | null;
    secondCompetitorScore?: number | null;
    state?: 'New' | 'InProgress' | 'Finished';
}

type TournamentState = "New" | "Soon" | "Ongoing" | "Finished";

const ProfileDetailsRecentMatchItem = (
    {
        lightColor,
        darkColor,
        tournamentId,
        tournamentState,
        tournamentName,
        firstCompetitorName,
        secondCompetitorName,
        firstCompetitorScore,
        secondCompetitorScore,
        state = 'New',
        round
}: Props) => {

    const router = useRouter();

    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    const successColor = useThemeColor({}, 'success'); // dopasuj do swojego motywu

    const firstScore = firstCompetitorScore ?? 0;
    const secondScore = secondCompetitorScore ?? 0;

    const isFinished = state === 'Finished';
    const firstIsWinner = isFinished && firstScore > secondScore;
    const secondIsWinner = isFinished && secondScore > firstScore;

    const onItemPress = () => {
        router.push({
            pathname: '/tournament-brackets/[id]',
            params: { id: String(tournamentId), state: tournamentState, name: tournamentName },
        });
    };

    return (
        <TouchableOpacity onPress={onItemPress}>
            <View style={[{backgroundColor}, styles.container]}>
                <ThemedText type={"subtitle"}>{`Tournament: ` + tournamentName}</ThemedText>
                <HorizontalDivider thickness={1} />
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
        </TouchableOpacity>
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

export default ProfileDetailsRecentMatchItem;