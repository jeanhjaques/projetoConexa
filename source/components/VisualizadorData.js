import {View, Text, StyleSheet} from 'react-native'
export default function VisualizadorData(props){
    function formataMes(mesNaoFormatado){
        //getMonth() retorna o mes de 0 a 11, sendo 0 equivalente a Janeiro e 11 a Dezembro
        //Esta funcao trata isso e  coloca o 0 nos meses de 1 a 9

        const mesNaoFormatadoNumber = Number(mesNaoFormatado)
        if((mesNaoFormatadoNumber) + 1 < 10){
            return "0"+ (mesNaoFormatadoNumber+1)
        }
        else{
            return mesNaoFormatadoNumber+1
        }
    }
    function formataDia(diaNaoFormatado){
        //getDate() retorna o dia sem 0 quando o dia é menor que 10, essa funcao corrige isso

        const diaNaoFormatadoNumber = Number(diaNaoFormatado)
        if(diaNaoFormatadoNumber < 10){
            return "0"+ diaNaoFormatadoNumber
        }
        else{
            return diaNaoFormatadoNumber
        }
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Dia</Text>
                <Text style={styles.conteudo}>{formataDia(props.data.getDate())}/{formataMes(props.data.getMonth())}/{props.data.getFullYear()}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora</Text>
                <Text style={styles.conteudo}>{props.data.getHours()}: {props.data.getMinutes()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    label:{
        textAlign: 'center'
    },
    conteudo:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})