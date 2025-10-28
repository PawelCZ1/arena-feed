import React from 'react';
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedView from "@/components/themed-view";
import {StyleSheet} from "react-native";
import TournamentDetailsTopAppBar from "@/components/tournament-details/tournament-details-top-app-bar";

const TournamentDetails = () => {
    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.container}>
                <TournamentDetailsTopAppBar/>

            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default TournamentDetails;