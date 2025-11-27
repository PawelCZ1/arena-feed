import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import TournamentListItem from "@/components/tournaments/tournament-list-item";

const ProfileDetailsRecentTournamentsSection = () => {

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>
                Recent Tournaments
            </ThemedText>
            <TournamentListItem name={"Test tournament1"}/>
            <TournamentListItem name={"Test tournament2"}/>
            <TournamentListItem name={"Test tournament3"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 8,
    },
    header: {
        paddingBottom: 16,
    }
});

export default ProfileDetailsRecentTournamentsSection;