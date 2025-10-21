import {useState} from 'react';
import {StyleSheet, View} from "react-native";
import ThemedTextInput from "@/components/themed-text-input";
import {ThemedText} from "@/components/themed-text";
import {VerticalSpacer} from "@/components/vertical-spacer";
import ThemedButton from "@/components/themed-button";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import FormRow from "@/components/form-row";
import FormPasswordColumn from "@/components/form-password-column";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onDatePickerButtonPress = () => {
        if (showPicker) {
            setShowPicker(false);
        } else {
            setShowPicker(true);
        }
    };

    const onRegister = () => {

    };

    return (
        <View style={styles.container}>
            <FormRow inputName={"Username"} inputValue={username} onChangeText={setUsername} placeholder={"Type your username"}/>
            <FormRow inputName={"Email"} inputValue={email} onChangeText={setEmail} placeholder={"Type your email"}/>
            <FormPasswordColumn password={password} onChangePassword={setPassword} passwordConfirm={passwordConfirm} onChangePasswordConfirm={setPasswordConfirm}/>
            <FormRow inputName={"First name"} inputValue={firstName} onChangeText={setFirstName} placeholder={"Type your first name"}/>
            <FormRow inputName={"Last name"} inputValue={lastName} onChangeText={setLastName} placeholder={"Type your last name"}/>

            {/*do poprawki dla androida*/}
            <View style={styles.datePickerContainer}>
                <ThemedText style={[styles.text, {textAlign: "center"}]}>Date of birth</ThemedText>
                <View style={styles.datePickerButton}>
                    <ThemedText style={{textAlign:"center"}}>{birthDate.toLocaleDateString('pl-PL')}</ThemedText>
                    <ThemedButton title={showPicker ? "Hide picker" : "Show picker"} onPress={onDatePickerButtonPress} />
                </View>

                {showPicker && (
                    <RNDateTimePicker
                        value={birthDate}
                        mode="date"
                        display="inline"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setBirthDate(selectedDate);
                            }
                        }}
                    />
                )}
            </View>
            <VerticalSpacer size={16} />
            <ThemedButton title={"Register"} style={styles.button}  onPress={onRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16
    },
    text: {
        fontWeight: 'bold',
    },
    input: {
        width: 300,
    },
    button: {
        width: 150,
    },
    datePickerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    }
});

export default RegisterForm;