import React from 'react';
import {KeyboardAvoidingView, Platform} from "react-native";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import CreateTournamentTopAppBar from "@/components/create-tournament/create-tournament-top-app-bar";
import CreateTournamentHeader from "@/components/create-tournament/create-tournament-header";

const CreateTournament = () => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ThemedSafeAreaView>
                <CreateTournamentTopAppBar/>
                <CreateTournamentHeader/>
            </ThemedSafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default CreateTournament;