import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import TournamentListItem from "@/components/tournaments/tournament-list-item";
import {supabase} from "@/api/supabase";
import {getTournamentsByCompetitorId, TournamentRow} from "@/api/tournament/tournament";

interface Props {
    userId?: string;
}

const ProfileDetailsRecentTournamentsSection = ({userId}: Props) => {
    const [recentTournaments, setRecentTournaments] = useState<TournamentRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRecentTournaments = useCallback(async () => {
        if (!userId) {
            setError("User ID is required to load recent tournaments.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const fetchedTournaments = await getTournamentsByCompetitorId(userId, 3);
            setRecentTournaments(fetchedTournaments);
        } catch (e) {
            const message = e instanceof Error ? e.message : "An unexpected error occurred.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadRecentTournaments();
    }, [loadRecentTournaments]);

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>
                Recent Tournaments
            </ThemedText>
            {!loading && !error && recentTournaments.map((tournament) => (
                <TournamentListItem key={tournament.id} name={tournament?.name ?? "No name"}/>
            ))}
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