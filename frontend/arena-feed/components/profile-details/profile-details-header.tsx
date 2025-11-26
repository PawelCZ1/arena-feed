import React from 'react';
import {ThemedText} from "@/components/themed-text";
import {StyleSheet} from "react-native";

interface Props {
    username?: string | null;
}

const ProfileDetailsHeader = ({username}: Props) => {
    return (
        <ThemedText type="title" style={styles.header}>
            {username ??'No profile found'}
        </ThemedText>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 16,
        paddingStart: 16,
        width: "100%",
        fontWeight: 'bold',
        textAlign: 'left',
        fontStyle: "italic",
    }
});

export default ProfileDetailsHeader;