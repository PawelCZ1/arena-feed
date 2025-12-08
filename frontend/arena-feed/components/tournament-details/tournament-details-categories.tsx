import React from 'react';
import {Category} from '@/api/category/category';
import {StyleSheet, View} from 'react-native';
import TournamentDetailsCategoryGridItem from '@/components/tournament-details/tournament-details-category-grid-item';
import {ThemedText} from '@/components/themed-text';

interface CategoryWithCount extends Category {
    competitorsCount?: number;
}

interface Props {
    categories: CategoryWithCount[];
}

const TournamentDetailsCategories = ({categories}: Props) => {
    return (
        <View style={styles.wrapper}>
            <ThemedText style={styles.text}>
                Categories
            </ThemedText>

            <View style={styles.grid}>
                {categories.map(category => (
                    <View key={category.id} style={styles.gridItem}>
                        <TournamentDetailsCategoryGridItem
                            categoryName={category.name}
                            competitorsCount={category.competitorsCount}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'stretch',
        padding: 8,
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: '33.33%', // 3 kolumny; zmień na '50%' dla 2 kolumn
        padding: 4,
    },
});

export default TournamentDetailsCategories;
