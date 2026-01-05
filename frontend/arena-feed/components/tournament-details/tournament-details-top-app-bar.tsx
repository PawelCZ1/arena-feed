import React from 'react';
import {useRouter} from "expo-router";
import ThemedView from "@/components/themed-view";
import ThemedTextButton from "@/components/themed-text-button";
import {StyleSheet} from "react-native";
import {TournamentRow} from "@/api/tournament/tournament";

type TournamentState = "New" | "Soon" | "Ongoing" | "Finished";

interface Props {
    id: string;
    state: TournamentState;
}

const TournamentDetailsTopAppBar = ({id, state}: Props) => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

    const onBrackets = () => {
        router.push({
            pathname: '/tournament-brackets/[id]',
            params: { id: String(id), state },
        });
    };

    if (state === "New") {
        return (
            <ThemedView style={styles.newContainer}>
                <ThemedTextButton onPress={onBack} title={"Back"}/>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.bracketsContainer}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
            <ThemedTextButton onPress={onBrackets} title={"Brackets"}/>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    bracketsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    newContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    }
});

export default TournamentDetailsTopAppBar;