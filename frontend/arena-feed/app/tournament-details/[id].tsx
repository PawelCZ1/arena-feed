import React, {useEffect, useMemo, useState} from 'react';
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedView from "@/components/themed-view";
import {ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import TournamentDetailsTopAppBar from "@/components/tournament-details/tournament-details-top-app-bar";
import {useLocalSearchParams, useRouter} from "expo-router";
import {getTournamentById, TournamentRow} from "@/api/tournament/tournament";
import TournamentDetailsHeader from "@/components/tournament-details/tournament-details-header";
import TournamentDetailsDescription from "@/components/tournament-details/tournament-details-description";
import {ImageBackground} from "expo-image";
import TournamentDetailsDate from "@/components/tournament-details/tournament-details-date";
import TournamentDetailsLocation from "@/components/tournament-details/tournament-details-location";
import TournamentDetailsContact from "@/components/tournament-details/tournament-details-contact";
import ThemedButton from "@/components/themed-button";
import TournamentDetailsParticipants from "@/components/tournament-details/tournament-details-participants";
import {CompetitorRow, createCompetitor, getCompetitorsByTournamentId} from "@/api/competitor/competitor";
import {useAuth} from "@/api/auth/auth-provider";
import TournamentDetailsCategories from "@/components/tournament-details/tournament-details-categories";
import {Category, getCategoriesByTournamentId} from "@/api/category/category";
import defaultImage from '@/assets/images/react-logo.png';


type Params = {id: string};

type CategoryWithCount = Category & { competitorsCount: number };

const TournamentDetails = () => {
    const params = useLocalSearchParams<Params>();
    const id = params.id;

    const {session} = useAuth();
    const router = useRouter();
    const userId = session?.user?.id;

    const [data, setData] = useState<TournamentRow | null>(null);
    const [participants, setParticipants] = useState<CompetitorRow[] | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasJoined, setHasJoined] = useState(false);

    const shouldShowJoinButton = !!userId && !hasJoined;

    const onJoinTournamentPress = () => {
        if (!categories.length) {
            Alert.alert(
                'Join Tournament',
                'No categories available for this tournament.'
            );
            return;
        }

        Alert.alert(
            'Choose category',
            'Select a category to join:',
            [
                ...categories.map((cat) => ({
                    text: cat.name,
                    onPress: () => handleJoinTournament(cat.id),
                })),
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const handleJoinTournament = async (categoryId?: string) => {
        setLoading(true);
        setError(null);

        try {
            await createCompetitor({
                tournament_id: id,
                user_id: userId!,
                category_id: categoryId,
            });

            const participantsResponse = await getCompetitorsByTournamentId(id);
            setParticipants(participantsResponse);

            Alert.alert('Success', 'You joined the tournament.');
            setHasJoined(true);
        } catch (e) {
            const message = e instanceof Error ? e.message : 'An unexpected error occurred.';
            setError(message);
            Alert.alert(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) {
            setHasJoined(false);
            return;
        }
        const joined = participants?.some((p) => p.user_id === userId) ?? false;
        setHasJoined(joined);
    }, [participants, userId]);

    useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [tournamentResponse, participantsResponse, categoriesResponse] = await Promise.all([
                    getTournamentById(id),
                    getCompetitorsByTournamentId(id),
                    getCategoriesByTournamentId(id),
                ]);

                if (mounted) {
                    setData(tournamentResponse);
                    setParticipants(participantsResponse);
                    setCategories(categoriesResponse);
                }
            } catch (e: any) {
                if (mounted) {
                    setError(e?.message || 'Error loading tournament details.');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };
        void loadData();
        return () => {
            mounted = false;
        };
    }, [id]);

    const categoriesWithCount: CategoryWithCount[] = useMemo(() => {
        if (!categories.length) return [];

        const countsByCategoryId: Record<string, number> = (participants ?? []).reduce(
            (acc, competitor) => {
                const categoryId = competitor.category_id;
                if (!categoryId) return acc;
                acc[categoryId] = (acc[categoryId] ?? 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );

        return categories.map((c) => ({
            ...c,
            competitorsCount: countsByCategoryId[c.id] ?? 0,
        }));
    }, [categories, participants]);

    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.container}>
                <TournamentDetailsTopAppBar id={id} state={data?.state ?? "New"}/>
                {loading ? (
                    <ActivityIndicator/>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : (
                    <ImageBackground
                        style={styles.background}
                        source={defaultImage}
                        contentFit={"cover"}
                        blurRadius={1}
                    >
                        <ScrollView contentContainerStyle={styles.content}>
                            <TournamentDetailsHeader text={data?.name}/>
                            <View style={styles.contentRow}>
                                <TournamentDetailsDate date={data?.date}/>
                                <TournamentDetailsLocation location={data?.location}/>
                            </View>
                            <TournamentDetailsParticipants count={participants?.length ?? 0}/>
                            <TournamentDetailsContact/>
                            {shouldShowJoinButton && (
                                <ThemedButton title={"Join Tournament"} onPress={onJoinTournamentPress} />
                            )}
                            <TournamentDetailsCategories categories={categoriesWithCount}/>
                            <TournamentDetailsDescription description={data?.description}/>
                        </ScrollView>
                    </ImageBackground>
                )}
            </ThemedView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: "center",
        gap: 16
    },
    container: {
        flex: 1
    },
    contentRow: {
        flexDirection: 'row',
        gap: 32,
    },
    errorContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    errorText: { color: 'red', paddingHorizontal: 16, paddingVertical: 8, textAlign: 'center' },
});

export default TournamentDetails;
