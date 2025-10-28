import React from 'react';
import {StyleSheet, View} from "react-native";
import TournamentDetailsHeader from "@/components/tournament-details/tournament-details-header";

const TournamentDetailsContent = () => {
    return (
        <View style={styles.background}>
            <TournamentDetailsHeader/>
            <View style={{flex: 1}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1
    }
});

export default TournamentDetailsContent;