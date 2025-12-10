import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import SimpleTopAppBar from "@/components/simple-top-app-bar";
import TournamentBracketsHeader from "@/components/tournament-brackets/tournament-brackets-header";
import TournamentBracketsDropdown from "@/components/tournament-brackets/tournament-brackets-dropdown";
import TournamentBracketsMatchItem from "@/components/tournament-brackets/tournament-brackets-match-item";
import { getCategoriesByTournamentId } from "@/api/category/category";
import { listMatchesWithCompetitorsByCategory, MatchWithCompetitors } from "@/api/match/match";
import { useLocalSearchParams } from "expo-router";

type Category = {
    id: string;
    name: string;
};

type Params = { id: string };

const TournamentBrackets = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [matches, setMatches] = useState<MatchWithCompetitors[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);

    const params = useLocalSearchParams<Params>();
    const tournamentId = params.id;

    const loadCategories = useCallback(async () => {
        if (!tournamentId) return;
        try {
            setLoadingCategories(true);
            const data = await getCategoriesByTournamentId(tournamentId);
            setCategories(data);
            if (data.length > 0) {
                setSelectedCategoryId(data[0].id);
            }
        } catch (e) {
            console.error("Error loading categories", e);
        } finally {
            setLoadingCategories(false);
        }
    }, [tournamentId]);

    const loadMatches = useCallback(
        async (categoryId: string) => {
            try {
                setLoadingMatches(true);
                const data = await listMatchesWithCompetitorsByCategory(
                    Number(categoryId), // category_id w bazie to number
                );
                setMatches(data);
            } catch (e) {
                console.error("Error loading matches", e);
            } finally {
                setLoadingMatches(false);
            }
        },
        [],
    );

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        if (selectedCategoryId) {
            loadMatches(selectedCategoryId);
        }
    }, [selectedCategoryId, loadMatches]);

    const onSelectCategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
    };

    const renderItem = ({ item }: { item: MatchWithCompetitors }) => (
        <TournamentBracketsMatchItem
            firstCompetitorName={item.firstCompetitorName}
            secondCompetitorName={item.secondCompetitorName}
            firstCompetitorScore={item.firstCompetitorScore}
            secondCompetitorScore={item.secondCompetitorScore}
        />
    );

    if (loadingCategories && categories.length === 0) {
        return (
            <ThemedSafeAreaView>
                <SimpleTopAppBar />
                <ActivityIndicator />
            </ThemedSafeAreaView>
        );
    }

    return (
        <ThemedSafeAreaView>
            <SimpleTopAppBar />
            <TournamentBracketsHeader />
            <TournamentBracketsDropdown
                categories={categories}
                onSelectCategory={onSelectCategory}
            />
            {loadingMatches && matches.length === 0 ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={matches}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                />
            )}
        </ThemedSafeAreaView>
    );
};

export default TournamentBrackets;
