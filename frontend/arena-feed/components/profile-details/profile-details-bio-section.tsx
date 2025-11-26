import React from 'react';
import ProfileDetailsSectionRow from "@/components/profile-details/profile-details-section-row";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";

interface Props {
    firstName?: string | null;
    lastName?: string | null;
    birthdate?: Date | null;
}

const ProfileDetailsBioSection = ({firstName, lastName, birthdate}: Props) => {
    const age = birthdate
        ? Math.floor((Date.now() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
        : 0;
    return (
        <View style={styles.container}>
            <ThemedText type={"subtitle"}>
                Bio
            </ThemedText>
            <ProfileDetailsSectionRow name="First name" value={firstName ?? "No name"}/>
            <ProfileDetailsSectionRow name="Last name" value={lastName ?? "No name"}/>
            <ProfileDetailsSectionRow name="Age" value={age.toString()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 8,
    }
});

export default ProfileDetailsBioSection;