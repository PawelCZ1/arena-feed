import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
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

const CreateTournament = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());

    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                    <ThemedButton title="Create"  onPress={() => {}}/>

                </ThemedScrollView>
            </ThemedSafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
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