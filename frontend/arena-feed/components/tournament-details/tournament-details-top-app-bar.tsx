import React from 'react';
import {useRouter} from "expo-router";
import ThemedView from "@/components/themed-view";
import ThemedTextButton from "@/components/themed-text-button";
import {StyleSheet} from "react-native";

const TournamentDetailsTopAppBar = () => {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    }
});

export default TournamentDetailsTopAppBar;