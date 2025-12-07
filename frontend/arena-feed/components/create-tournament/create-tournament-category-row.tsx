// components/create-tournament/create-tournament-category-row.tsx
import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import {useThemeColor} from "@/hooks/use-theme-color";

interface Props {
    value: string;
    lightColor?: string;
    darkColor?: string;
}

const CreateTournamentCategoryRow = ({value, lightColor, darkColor}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <View style={[{backgroundColor},styles.container]}>
            <ThemedText style={styles.text}>Name</ThemedText>
            <ThemedText style={styles.text}>{value}</ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4
    },
    text: {
        fontStyle: 'italic',
    }
});

export default CreateTournamentCategoryRow;
