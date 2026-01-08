import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import ProfileDetailsSectionRow from "@/components/profile-details/profile-details-section-row";

interface Props {
    total?: number;
    wins?: number;
    losses?: number;
}

const ProfileDetailsStatsSection = ({total, wins, losses}: Props) => {
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">
                Stats
            </ThemedText>
            <ProfileDetailsSectionRow name="Total" value={total?.toString() ?? "0"}/>
            <ProfileDetailsSectionRow name="Wins" value={wins?.toString() ?? "0"}/>
            <ProfileDetailsSectionRow name="Losses" value={losses?.toString() ?? "0"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 8,
    }
});

export default ProfileDetailsStatsSection;