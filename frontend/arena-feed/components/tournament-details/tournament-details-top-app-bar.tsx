import React from 'react';
import {useRouter} from "expo-router";
import ThemedView from "@/components/themed-view";
import ThemedTextButton from "@/components/themed-text-button";
import {StyleSheet} from "react-native";
import {TournamentRow} from "@/api/tournament/tournament";

interface Props {
    id: string;
}

const TournamentDetailsTopAppBar = ({id}: Props) => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

    const onBrackets = () => {
        router.push({
            pathname: '/tournament-brackets/[id]',
            params: { id: String(id) },
        });
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
            <ThemedTextButton onPress={onBrackets} title={"Brackets"}/>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    }
});

export default TournamentDetailsTopAppBar;