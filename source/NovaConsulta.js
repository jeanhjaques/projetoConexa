import { useState } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { TextInput, IconButton, Button as ButtonPaper } from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import VisualizadorData from "./components/VisualizadorData";



export default function NovaConsulta({ navigation }) {
    const [observacao, setObservacao] = useState("");
    const [nomePaciente, setNomePaciente] = useState("");
    const [dataConsulta, setDataConsulta] = useState("")


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        console.log(date.getMinutes())
        setDataConsulta(date)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                mode="outlined"
                label="Nome do Paciente"
                value={nomePaciente}
                onChangeText={nomePaciente => setNomePaciente(nomePaciente)}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                label="Observação"
                value={observacao}
                onChangeText={observacao => setObservacao(observacao)}
            />
            <View>
                {
                    dataConsulta != "" ?
                        <View>
                            <VisualizadorData data={dataConsulta} />
                        </View>
                        :
                        <Text style={styles.nenhumaDataSelecionada}>Nenhuma data selecionada</Text>
                }
                <View style={styles.buttonEditorData}>
                    <ButtonPaper icon="calendar-edit" mode="contained" onPress={showDatePicker}>
                        Selecionar Data
                    </ButtonPaper>
                </View>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View>
                <Button style={styles.button} title="Cadastrar" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    input: {
        marginVertical: 5,
    },
    button: {
        marginTop: 10
    },
    nenhumaDataSelecionada: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginVertical: 5,
        textAlign: 'center'
    },
    buttonEditorData: {
        marginVertical: 5,
        marginHorizontal: 50
    }
})