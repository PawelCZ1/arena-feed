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
import {createCategory} from "@/api/category/category";

const CreateTournament = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(new Date());

    const [categories, setCategories] = useState<string[]>([]);

    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const onAddCategory = (name: string) => {
        if (name.trim() === "") {
            Alert.alert("Category name cannot be empty.");
            return;
        }
        if (categories.length > 10) {
            Alert.alert("You can add up to 10 categories only.");
            return;
        }
        setCategories((prevCategories) => [...prevCategories, name]);
    };

    const onDeleteCategory = (index: number) => {
        Alert.alert("Delete Category", "Are you sure you want to delete this category?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive",
                    onPress: () => {
                        setCategories(prev => prev.filter((_, i) => i !== index));
                    }
                }
            ]
        );
    };

    const handleCreate = async () => {
        if (name.trim() === "" || description.trim() === "" || location.trim() === "") {
            Alert.alert("Please fill in all fields.");
            return;
        }

        if (categories.length === 0) {
            Alert.alert("Please add at least one category.");
            return;
        }

        const minimumDate = new Date();
        minimumDate.setDate(minimumDate.getDate() + 8);

        if (date < minimumDate) {
            Alert.alert("Please set date at least 8 days in the future.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data: {user} } = await supabase.auth.getUser();
            const tournament = await createTournament({
                name: name.trim(),
                description: description.trim(),
                location: location.trim(),
                date: date.toISOString(),
                owner_id: user?.id ?? null
            });

            if (categories.length > 0) {
                await Promise.all(
                    categories.map((catName) => createCategory({
                        name: catName,
                        tournament_id: tournament.id.toString()
                    }))
                );
            }
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
                    <CreateTournamentCategorySection onAddCategory={onAddCategory} categories = {categories} onDeleteCategory={onDeleteCategory}/>
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