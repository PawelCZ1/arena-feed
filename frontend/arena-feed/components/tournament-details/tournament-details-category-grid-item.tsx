import React from 'react';
import {StyleSheet, View} from "react-native";
import {useThemeColor} from "@/hooks/use-theme-color";
import {ThemedText} from "@/components/themed-text";

interface Props {
    lightColor?: string;
    darkColor?: string;
    categoryName?: string;
    competitorsCount?: number;
}

const TournamentDetailsCategoryGridItem = ({lightColor, darkColor, categoryName, competitorsCount}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <View style={[{backgroundColor}, styles.container]}>
            <ThemedText>
                {categoryName ?? "No name"}
            </ThemedText>
            <ThemedText>
                {competitorsCount ?? 0}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 4
    }
});

export default TournamentDetailsCategoryGridItem;