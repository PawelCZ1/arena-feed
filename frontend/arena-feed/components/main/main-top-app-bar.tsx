import {Alert, StyleSheet, View} from 'react-native';
import ThemedView from "@/components/themed-view";
import {useRouter} from "expo-router";
import ThemedTextButton from "@/components/themed-text-button";
import {useAuth} from "@/api/auth/auth-provider";
import {ThemedText} from "@/components/themed-text";
import {useUserProfile} from "@/api/users/user";

const MainTopAppBar = () => {
    const router = useRouter();
    const { session, user, signOut } = useAuth();
    const { profile } = useUserProfile(user?.id ?? null);
    const onLogin = () => {
        router.push('/login');
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
    const onRegister = () => {
        router.push('/register');
    };

    return (
        <ThemedView style={styles.container}>
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
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 8
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16
    }
});

export default MainTopAppBar;