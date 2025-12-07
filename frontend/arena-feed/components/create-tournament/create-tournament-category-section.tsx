import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import ThemedTextInput from "@/components/themed-text-input";
import ThemedButton from "@/components/themed-button";
import CreateTournamentCategoryRow from "@/components/create-tournament/create-tournament-category-row";

const CreateTournamentCategorySection = () => {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>
                Categories
            </ThemedText>
            <View style={styles.add}>
                <ThemedButton style={styles.button} onPress={()=> {}} title="Add"/>
                <ThemedTextInput style={styles.input} value={""} placeholder={""}/>
            </View>
            <CreateTournamentCategoryRow value={"Test"}/>
            <CreateTournamentCategoryRow value={"Test"}/>
            <CreateTournamentCategoryRow value={"Test"}/>
            <CreateTournamentCategoryRow value={"Test"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 8,
    },
    add: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 8
    },
    button: {
        width: 75
    },
    input: {
        width: 250
    },
    text: {
        fontWeight: "bold",
    }
});

export default CreateTournamentCategorySection;