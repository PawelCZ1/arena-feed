import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

const ProfileDetailsRecentTournamentsSection = () => {
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">
                Recent Tournaments
            </ThemedText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 8,
    }
});

export default ProfileDetailsRecentTournamentsSection;