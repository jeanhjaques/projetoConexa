import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { Card } from "react-native-paper";
import { DadosLoginContexto } from './providers/DadosLogin';



export default function Home({ navigation }) {
    const [consultas, setConsultas] = useState([])

    const { dadosLogin, setDadosLogin } = useContext(DadosLoginContexto);

    useEffect(() => {
        fetch('http://desafio.conexasaude.com.br/api/consultas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + dadosLogin.token,
            }
        })
            .then(async (respostaDoServer) => {
                const dadosDaResposta = await respostaDoServer.json();
                setConsultas(dadosDaResposta)
                console.log(dadosLogin)
            })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={consultas.data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate('Detalhes Consulta', {idConsulta: item.id})}>
                        <Card.Title title={item.paciente} subtitle={item.dataConsulta} />
                        <Card.Content>
                            <Text>{item.medico.nome}</Text>
                        </Card.Content>
                    </Card>
                )}
            />
            <View>
                <Button title="Cadastrar nova consulta" color="#f28080" onPress={() => navigation.navigate('Nova Consulta')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5
    }
})