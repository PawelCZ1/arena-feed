import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import ThemedSafeAreaView from "@/components/themed-safe-area-view";
import CreateTournamentTopAppBar from "@/components/create-tournament/create-tournament-top-app-bar";
import CreateTournamentHeader from "@/components/create-tournament/create-tournament-header";
import ThemedScrollView from "@/components/themed-scroll-view";
import FormRow from "@/components/form-row";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {ThemedText} from "@/components/themed-text";
import IOSDatePicker from "@/components/ios-date-picker";
import AndroidDatePicker from "@/components/android-date-picker";
import CreateTournamentDescriptionRow from "@/components/create-tournament/create-tournament-description-row";
import ThemedButton from "@/components/themed-button";
import {supabase} from "@/api/supabase";
import {createTournament} from "@/api/tournament/tournament";
import {useRouter} from "expo-router";
import CreateTournamentCategorySection from "@/components/create-tournament/create-tournament-category-section";
import CreateTournamentCategoryRow from "@/components/create-tournament/create-tournament-category-row";

const CreateTournament = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());

    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleCreate = async () => {
        if (name.trim() === "" || description.trim() === "" || location.trim() === "") {
            Alert.alert("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data: {user} } = await supabase.auth.getUser();
            await createTournament({
                name: name.trim(),
                description: description.trim(),
                location: location.trim(),
                date: date.toISOString(),
                owner_id: user?.id ?? null
            });
        } catch (e) {
            const message = e instanceof Error ? e.message : "An unexpected error occurred.";
            setError(message);
        } finally {
            setLoading(false);
            if (!error) {
                Alert.alert("Success", "Tournament created successfully.", [
                    { text: "OK" , onPress: () => router.replace('/main') }
                ]);
            } else {
                Alert.alert(error);
            }
        }
    };

    const onDatePickerButtonPress = () => {
        setShowPicker((s) => !s);
    };

    const onAndroidChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // Android: dialog returns event.type 'set' when confirmed
        if (selectedDate) {
            setDate(selectedDate);
        }
        setShowPicker(false);
    };

    const onIOSChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ThemedSafeAreaView>
                <CreateTournamentTopAppBar/>
                <CreateTournamentHeader/>
                <ThemedScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.contentContainer}>
                    <FormRow inputName={"Tournament name"} inputValue={name} onChangeText={setName} placeholder={"Type name"}/>
                    <CreateTournamentDescriptionRow descriptionValue={description} onChangeText={setDescription}/>
                    <FormRow inputName={"Tournament location"} inputValue={location} onChangeText={setLocation} placeholder={"Type location"}/>
                    <View style={styles.datePickerContainer}>
                        <ThemedText style={[styles.text, { textAlign: "center" }]}>
                            Date of tournament
                        </ThemedText>

                        {Platform.OS === "ios" ? (
                            <IOSDatePicker
                                date={date}
                                showPicker={showPicker}
                                onDatePickerButtonPress={onDatePickerButtonPress}
                                onIOSChange={onIOSChange}
                            />
                        ) : (
                            <AndroidDatePicker
                                date={date}
                                showPicker={showPicker}
                                onDatePickerButtonPress={onDatePickerButtonPress}
                                onAndroidChange={onAndroidChange}
                            />
                        )}
                    </View>
                    <CreateTournamentCategorySection/>
                    <ThemedButton title="Create"  onPress={handleCreate}/>
                </ThemedScrollView>
            </ThemedSafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16

    },
    datePickerContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 32
    },
    text: {
        fontWeight: "bold",
    }
});

export default CreateTournament;