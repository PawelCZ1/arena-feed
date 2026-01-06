import {useEffect, useState} from 'react';
import {useAuth} from "@/api/auth/auth-provider";
import {useUserProfile} from "@/api/users/user";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import ProfileDetailsTopAppBar from "@/components/profile-details/profile-details-top-app-bar";
import ProfileDetailsHeader from "@/components/profile-details/profile-details-header";
import ProfileDetailsBioSection from "@/components/profile-details/profile-details-bio-section";
import {ScrollView, StyleSheet, View} from "react-native";
import ProfileDetailsStatsSection from "@/components/profile-details/profile-details-stats-section";
import ProfileDetailsRecentMatchesSection
    from "@/components/profile-details/profile-details-recent-matches-section";
import TournamentList from "@/components/tournaments/tournament-list";

const ProfileDetails = () => {
    const { user, session } = useAuth();
    const {profile} = useUserProfile(user?.id ?? null);

    return (
        <ThemedSafeAreaView>
            <ProfileDetailsTopAppBar/>
            <ScrollView>
                <View style={styles.content}>
                    <ProfileDetailsHeader username={profile?.username}/>
                    <ProfileDetailsBioSection firstName={profile?.firstName} lastName={profile?.lastName} birthdate={profile?.birthDate}/>
                    <ProfileDetailsStatsSection/>
                    <ProfileDetailsRecentMatchesSection userId={user?.id}/>
                </View>
            </ScrollView>
        </ThemedSafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        gap: 32
    }
});

export default ProfileDetails;