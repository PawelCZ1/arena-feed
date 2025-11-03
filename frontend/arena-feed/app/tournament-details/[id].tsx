import React, {useEffect, useState} from 'react';
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ThemedView from "@/components/themed-view";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import TournamentDetailsTopAppBar from "@/components/tournament-details/tournament-details-top-app-bar";
import {useLocalSearchParams} from "expo-router";
import {getTournamentById, TournamentRow} from "@/api/tournament/api";
import {ThemedText} from "@/components/themed-text";
import TournamentDetailsHeader from "@/components/tournament-details/tournament-details-header";
import TournamentDetailsDescription from "@/components/tournament-details/tournament-details-description";
import defaultImage from '@/assets/images/react-logo.png';
import {ImageBackground} from "expo-image";
import TournamentDetailsDate from "@/components/tournament-details/tournament-details-date";
import TournamentDetailsLocation from "@/components/tournament-details/tournament-details-location";
import TournamentDetailsContact from "@/components/tournament-details/tournament-details-contact";

type Params = {id: string};

const TournamentDetails = () => {
    const params = useLocalSearchParams<Params>();

    const id = params.id;

    const [data, setData] = useState<TournamentRow | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getTournamentById(Number(id));
                if (mounted) {
                    setData(response);
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


    return (
        <ThemedSafeAreaView>
            <ThemedView style={styles.container}>
                <TournamentDetailsTopAppBar/>
                {loading ? (
                    <ActivityIndicator/>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : (
                    <ImageBackground style={styles.background} source={defaultImage} contentFit={"cover"} blurRadius={1}>
                        <View style={styles.content}>
                            <TournamentDetailsHeader text={data?.name}/>
                            <View style={styles.contentRow}>
                                <TournamentDetailsDate date={data?.date}/>
                                <TournamentDetailsLocation location={data?.location}/>
                            </View>
                            <TournamentDetailsContact/>
                            <TournamentDetailsDescription description={data?.description}/>
                        </View>
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