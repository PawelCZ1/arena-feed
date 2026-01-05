import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

type TournamentState = "New" | "Soon" | "Ongoing" | "Finished";

interface Props {
    state: TournamentState;
}

const TournamentDetailsState = ({state}: Props) => {
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
        gap: 16
    },
    text: {
        fontWeight: 'bold',
    }
});

export default TournamentDetailsState;