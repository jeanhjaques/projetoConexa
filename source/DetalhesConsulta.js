import { useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {DadosLoginContexto} from './providers/DadosLogin';


export default function DetalhesConsulta({navigation, route}){
    const [detalhesConsulta, setDetalhesConsulta] = useState([]);
    const [nomeMedico, setNomeMedico] = useState("");

    const { dadosLogin, setDadosLogin } = useContext(DadosLoginContexto);


    useEffect(() => {
        fetch(`http://desafio.conexasaude.com.br/api/consulta/${route.params.idConsulta}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + dadosLogin.token,
            }
        })
            .then(async (respostaDoServer) => {
                const dadosDaResposta = await respostaDoServer.json();
                console.log(dadosDaResposta)
                setDetalhesConsulta(dadosDaResposta.data)
                setNomeMedico(dadosDaResposta.data.medico.nome)
            })
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.conteudo}>{detalhesConsulta.paciente}</Text>
            <Text style={styles.label}>Data da consulta: </Text>
            <Text style={styles.conteudo}>{detalhesConsulta.dataConsulta}</Text>
            <Text style={styles.label}>Nome do médico:</Text>
            <Text style={styles.conteudo}>{nomeMedico}</Text>
            <Text style={styles.label}>Observações:</Text>
            <Text style={styles.conteudo}>{detalhesConsulta.observacao}</Text>
            <Button title='Voltar para a lista de consultas' color='#f28080' onPress={() => navigation.navigate('Consultas')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 5
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20
    },
    conteudo:{
        fontSize: 20,
        marginBottom: 5
    }
})