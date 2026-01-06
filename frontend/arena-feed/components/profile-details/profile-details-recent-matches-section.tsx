import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import TournamentListItem from "@/components/tournaments/tournament-list-item";
import {supabase} from "@/api/supabase";
import {getTournamentsByCompetitorId, TournamentRow} from "@/api/tournament/tournament";
import {useRouter} from "expo-router";
import TournamentBracketsMatchItem from "@/components/tournament-brackets/tournament-brackets-match-item";
import {listRecentMatchesByUserId, RecentMatchDto} from "@/api/match/match";

interface Props {
    userId?: string;
}

const ProfileDetailsRecentMatchesSection = ({userId}: Props) => {
    const [recentMatches, setRecentMatches] = useState<RecentMatchDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const loadRecentMatches = useCallback(async () => {
        if (!userId) {
            setError("User ID is required to load recent matches.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const fetchedMatches = await listRecentMatchesByUserId(userId);
            setRecentMatches(fetchedMatches);
        } catch (e) {
            const message = e instanceof Error ? e.message : "An unexpected error occurred.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        loadRecentMatches();
    }, [loadRecentMatches]);

    const isEmpty = recentMatches.length === 0;

    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>
                Recent Matches
            </ThemedText>
            {!loading && !error && !isEmpty && recentMatches.map((match, index) => (
                <TournamentBracketsMatchItem
                    key={index}
                    firstCompetitorName={match.firstCompetitorName}
                    secondCompetitorName={match.secondCompetitorName}
                    firstCompetitorScore={match.firstCompetitorScore}
                    secondCompetitorScore={match.secondCompetitorScore}
                    state="Finished"
                />
            ))}
            {!loading && !error && isEmpty && (
                <ThemedText style={styles.empty}>
                    No recent matches found
                </ThemedText>
            )}
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
    },
    empty: {
        fontStyle: "italic",
        textAlign: "center",
        width: "100%"
    }
});

export default ProfileDetailsRecentMatchesSection;