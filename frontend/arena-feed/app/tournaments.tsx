import React from 'react';
import TournamentsTopAppBar from "@/components/tournaments/tournaments-top-app-bar";
import {StyleSheet, View} from "react-native";
import {ThemedView} from "@/app-example/components/themed-view";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import TournamentList from "@/components/tournaments/tournament-list";

const Tournaments = () => {
    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.container}>
                <TournamentsTopAppBar/>
                <TournamentList/>
            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Tournaments;