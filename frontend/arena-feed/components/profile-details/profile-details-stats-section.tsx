import React from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import ProfileDetailsSectionRow from "@/components/profile-details/profile-details-section-row";

const ProfileDetailsStatsSection = () => {
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">
                Stats
            </ThemedText>
            <ProfileDetailsSectionRow name="Total" value={"0"}/>
            <ProfileDetailsSectionRow name="Wins" value={"0"}/>
            <ProfileDetailsSectionRow name="Loses" value={"0"}/>
            <ProfileDetailsSectionRow name="Draws" value={"0"}/>
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