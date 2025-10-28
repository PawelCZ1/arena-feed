import React from 'react';
import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/themed-text";

const TournamentsHeader = () => {
    return (
        <ThemedText style={styles.header} type={"subtitle"}>
            Upcoming Tournaments
        </ThemedText>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 24,
        paddingBottom: 16,
        paddingStart: 16,
        width: "100%",
        fontWeight: 'bold',
        textAlign: 'left',
        fontStyle: "italic",
    }
});

export default TournamentsHeader;