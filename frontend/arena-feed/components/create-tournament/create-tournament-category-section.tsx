import {useState} from 'react';
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/themed-text";
import ThemedTextInput from "@/components/themed-text-input";
import ThemedButton from "@/components/themed-button";
import CreateTournamentCategoryRow from "@/components/create-tournament/create-tournament-category-row";

interface Props {
    onAddCategory: (categoryName: string) => void;
    categories: string[];
    onDeleteCategory: (index: number) => void;
}

const CreateTournamentCategorySection = ({onAddCategory, categories, onDeleteCategory}: Props) => {
    const [input, setInput] = useState("");
    return (
        <View style={styles.container}>
            <ThemedText style={styles.text}>
                Categories
            </ThemedText>
            <View style={styles.add}>
                <ThemedButton style={styles.button} onPress={()=> {onAddCategory(input.trim())}} title="Add"/>
                <ThemedTextInput style={styles.input} value={input} placeholder={""} onChangeText={setInput}/>
            </View>
            {categories.map((category, index) => (
                <CreateTournamentCategoryRow key={index} value={category} onDelete={() => {onDeleteCategory(index)}}/>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 8,
    },
    add: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 8
    },
    button: {
        width: 75
    },
    input: {
        width: 250
    },
    text: {
        fontWeight: "bold",
    }
});

export default CreateTournamentCategorySection;