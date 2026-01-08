import React from 'react';
import ThemedView from "@/components/themed-view";
import {Alert, StyleSheet, View} from "react-native";
import {useRouter} from "expo-router";
import ThemedTextButton from "@/components/themed-text-button";
import {useAuth} from "@/api/auth/auth-provider";
import {useUserProfile} from "@/api/users/user";

const TournamentsTopAppBar = () => {
    const router = useRouter();
    const { session, user, signOut } = useAuth();
    const { profile } = useUserProfile(user?.id ?? null);
    const onBack = () => {
        router.back();
    }
    const onLogin = () => {
        router.push('/login');
    };
    const onRegister = () => {
        router.push('/register');
    };

    const onLogout = async () => {
        Alert.alert("Logout", "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout", style: "destructive",
                    onPress: async () => {
                        await signOut();
                        router.replace('/');
                    }
                }
            ]
        );
    };
    const onProfileClick = () => {
        router.push('/profile-details');
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedTextButton onPress={onBack} title={"Back"}/>
            <View style={styles.buttonContainer}>
                {!session ? (
                    <>
                        <ThemedTextButton onPress={onLogin} title={"Login"}/>
                        <ThemedTextButton onPress={onRegister} title={"Register"}/>
                    </>
                ) : (
                    <>
                        <ThemedTextButton onPress={onLogout} title={"Logout"}/>
                        <ThemedTextButton onPress={onProfileClick} title={profile?.username ?? "Null"}/>
                    </>
                )}
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16
    }
});

export default TournamentsTopAppBar;