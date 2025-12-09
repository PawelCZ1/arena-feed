import React, {useState} from 'react';
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import SimpleTopAppBar from "@/components/simple-top-app-bar";
import TournamentBracketsHeader from "@/components/tournament-brackets/tournament-brackets-header";
import TournamentBracketsDropdown from "@/components/tournament-brackets/tournament-brackets-dropdown";
import {FlatList} from "react-native";
import TournamentBracketsMatchItem from "@/components/tournament-brackets/tournament-brackets-match-item";
import {VerticalSpacer} from "@/components/vertical-spacer";

type Category = {
    id: string;
    name: string;
};

const categoriesMock: Category[] = [
    { id: 'kata', name: 'Kata' },
    { id: 'kumite', name: 'Kumite' },
    { id: 'kids', name: 'Dzieci' },
];

const TournamentBrackets = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(
        categoriesMock[0]?.id,
    );

    const onSelectCategory = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
    }

    const renderItem = ({ item }: { item: any }) => {
        return <TournamentBracketsMatchItem/>
    }

    return (
        <ThemedSafeAreaView>
            <SimpleTopAppBar/>
            <TournamentBracketsHeader/>
            <TournamentBracketsDropdown categories={categoriesMock} onSelectCategory={onSelectCategory} />
            <FlatList
                data={categoriesMock}
                renderItem={renderItem}
            >

            </FlatList>
        </ThemedSafeAreaView>
    );
};

export default TournamentBrackets;