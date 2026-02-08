import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import TournamentListItem from '@/components/tournaments/tournament-list-item';
import { VerticalSpacer } from '@/components/vertical-spacer';
import { getTournaments, TournamentRow } from '@/api/tournament/tournament';
import { useRouter } from 'expo-router';

const PAGE_SIZE = 20;

const TournamentList = () => {
    const [items, setItems] = useState<TournamentRow[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const offsetRef = useRef<number>(0);
    const loadingRef = useRef<boolean>(false);

    const router = useRouter();
    const onItemPress = (item: TournamentRow) => {
        router.push({
            pathname: '/tournament-details/[id]',
            params: { id: String(item.id) },
        });
    };

    const loadPage = useCallback(async (reset = false) => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        setError(null);

        try {
            const nextOffset = reset ? 0 : offsetRef.current;
            const { items: page, count } = await getTournaments({
                limit: PAGE_SIZE,
                offset: nextOffset,
                orderBy: 'created_at',
                asc: false,
            });

            setItems(prev => (reset ? page : [...prev, ...page]));
            offsetRef.current = nextOffset + (page?.length ?? 0);
            setTotal(count ?? 0);
        } catch (e: any) {
            setError('We couldn\'t load tournaments. Please check your internet connection and try again.');
        } finally {
            loadingRef.current = false;
            if (reset) setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadPage(true);
    }, [loadPage]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadPage(true);
    }, [loadPage]);

    const onEndReached = useCallback(() => {
        if (loadingRef.current) return;
        if (items.length >= total) return;
        loadPage(false);
    }, [items.length, total, loadPage]);

    const renderItem = ({ item }: { item: TournamentRow }) => (
        <TournamentListItem
            name={item.name ?? 'No name'}
            description={item.description ?? undefined}
            date={item.date ?? undefined}
            onPress={() => onItemPress(item)}
        />
    );

    const ListFooter = () =>
        loadingRef.current && items.length > 0 ? (
            <View style={styles.footer}>
                <ActivityIndicator />
            </View>
        ) : null;

    const EmptyComponent = () => (
        <View style={styles.empty}>
            {refreshing ? (
                <ActivityIndicator />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <Text style={styles.emptyText}>No tournaments.</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(t, idx) => String((t as any)?.id ?? idx)}
                renderItem={renderItem}
                contentContainerStyle={items.length === 0 ? styles.emptyContainer : styles.contentContainer}
                ItemSeparatorComponent={() => <VerticalSpacer size={8} />}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.6}
                ListFooterComponent={ListFooter}
                ListEmptyComponent={EmptyComponent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { padding: 8 },
    emptyContainer: { flex: 1, justifyContent: 'center' },
    footer: { paddingVertical: 16, alignItems: 'center' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    emptyText: { fontSize: 16, color: '#444' },
    error: { color: 'red', paddingHorizontal: 16, paddingVertical: 8, textAlign: 'center' },
});

export default TournamentList;