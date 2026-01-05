import React from 'react';
import {ThemedText} from "@/components/themed-text";
import {StyleSheet, View} from "react-native";

type TournamentState = "New" | "Soon" | "Ongoing" | "Finished";

interface Props {
    state: TournamentState;
}

const TournamentBracketsState = ({state}: Props) => {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>
                State
            </ThemedText>
            <ThemedText style={styles.text}>
                :
            </ThemedText>
            <ThemedText style={styles.text}>
                {state}
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        padding: 8,
        gap: 16
    },
    text: {
        fontWeight: 'bold',
    }
});

export default TournamentBracketsState;