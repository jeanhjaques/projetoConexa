import { useState, useContext} from "react";
import { View, StyleSheet, Image, Button } from "react-native"
import { TextInput } from "react-native-paper";
import {DadosLoginContexto} from './providers/DadosLogin';



export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("")
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const { dadosLogin, setDadosLogin } = useContext(DadosLoginContexto);

    function efetuarLogin(){
        const loginJson = {
            "email": email,
            "senha": senha
        }

        fetch('http://desafio.conexasaude.com.br/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginJson)
          })
            .then(async (respostaDoServer) => {
              const dadosDaResposta = await respostaDoServer.json();
              const token = dadosDaResposta.data.token;
              console.log(token)
              setDadosLogin(dadosDaResposta.data)
              navigation.navigate('Consultas')
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={require('../assets/logo-conexa.png')}
                />
            </View>
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Senha"
                    value={senha}
                    secureTextEntry={secureTextEntry}
                    onChangeText={senha => setSenha(senha)}
                    right={<TextInput.Icon name="eye" onPress={() => setSecureTextEntry(!secureTextEntry)} />}
                />
                <Button style={styles.button} color="#f28080" onPress={()=> efetuarLogin()} title="Entrar"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    containerLogin: {
        marginHorizontal: 10,
        marginTop: 100
    },
    containerLogo: {
        alignItems: 'center',
        marginTop: 100,
        paddingVertical: 20,
    },
    logo: {
        width: 200,
        height: 50
    },
    input:{
        marginBottom: 5,
    },
    button: {
        marginTop: 15
    }
})