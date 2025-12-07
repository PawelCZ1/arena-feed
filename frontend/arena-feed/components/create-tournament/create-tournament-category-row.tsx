// components/create-tournament/create-tournament-category-row.tsx
import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import {useThemeColor} from "@/hooks/use-theme-color";
import ThemedTextButton from "@/components/themed-text-button";

interface Props {
    value: string;
    lightColor?: string;
    darkColor?: string;
    onDelete?: () => void;
}

const CreateTournamentCategoryRow = ({value, onDelete, lightColor, darkColor}: Props) => {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'surface');
    return (
        <View style={[{backgroundColor},styles.container]}>
            <ThemedText style={styles.text}>{`Name: ${value}`}</ThemedText>
            <ThemedTextButton onPress={onDelete} title="Delete"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        padding: 8,
        flexDirection: "row",
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    text: {
        fontStyle: 'italic',
    }
});

export default CreateTournamentCategoryRow;
