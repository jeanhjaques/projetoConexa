import { useState, useContext } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { TextInput, Button as ButtonPaper, Dialog, Portal } from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import VisualizadorData from "./components/VisualizadorData";
import {DadosLoginContexto} from './providers/DadosLogin';

export default function NovaConsulta({ navigation }) {
    const { dadosLogin, setDadosLogin } = useContext(DadosLoginContexto);

    const [observacao, setObservacao] = useState("");
    const [nomePaciente, setNomePaciente] = useState("");
    const [dataConsulta, setDataConsulta] = useState("");

    const [mensagem, setMensagem] = useState("")

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

    function cadastrarConsulta() {
        const novaConsulta = {
            "dataConsulta": dataConsulta,
            "idMedico": "0", //Esse dado nao está disponivel na API, então fixei por enquanto
            "observacao": observacao,
            "paciente": nomePaciente
        }

        fetch('http://desafio.conexasaude.com.br/api/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + dadosLogin.token,
            },
            body: JSON.stringify(novaConsulta)
        })
            .then(async (respostaDoServer) => {
                const dadosDaResposta = await respostaDoServer.json();
                console.log(dadosDaResposta)

                if (dadosDaResposta.errorCode != null) {
                    setMensagem(dadosDaResposta.message)
                }
                else {
                    setMensagem("Cadastrado com sucesso")
                }
            })
    }

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
                    <ButtonPaper color='#0031b2' icon="calendar-edit" mode="contained" onPress={showDatePicker}>
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
                {nomePaciente != "" && dataConsulta != "" && observacao != "" ?
                    <Button onPress={() => cadastrarConsulta()} color='#f28080' style={styles.button} title="Cadastrar" />

                    :
                    <Button disabled onPress={() => cadastrarConsulta()} style={styles.button} title="Cadastrar" />
                }
            </View>
            <View style={styles.mensagemContainer}>
                <Text style={styles.mensagem}>{mensagem}</Text>
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
    },
    mensagemContainer: {
        justifyContent: 'center'
    },
    mensagem: {
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 5,
        textAlign: 'center',
        justifyContent: 'center'
    }
})