import React from 'react';
import {FlatList, StyleSheet} from "react-native";
import TournamentListItem from "@/components/tournaments/tournament-list-item";
import {VerticalSpacer} from "@/components/vertical-spacer";

const TournamentList = () => {
    const data = generateTournaments(150);
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
                return <TournamentListItem
                    name={item[0]}
                    description={item[1]}
                    date={item[2]}
                />
            }}
            contentContainerStyle={styles.contentContainer}
            ItemSeparatorComponent={() => <VerticalSpacer size={8}/>}
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 8
    }
});

function generateTournaments(count = 10): Array<[string, string | null, string]> {
    const result: Array<[string, string | null, string]> = [];
    for (let i = 1; i <= count; i++) {
        const name = `Tournament ${i}`;
        const description = i % 3 === 0 ? null : `Opis turnieju ${i}`;
        const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0]; // YYYY-MM-DD
        result.push([name, description, date]);
    }
    return result;
}

export default TournamentList;