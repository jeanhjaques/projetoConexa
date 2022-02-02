import { View, Text, StyleSheet, Button } from "react-native";
import { Card } from "react-native-paper"

export default function Home({ navigation }){
    return(
        <View>
            <Card style={styles.card}>
                <Card.Title title="Card Title" subtitle="Card Subtitle" />
                <Card.Content>
                    <Text>Cadastrar Nova Consulta</Text>
                </Card.Content>
            </Card>
            <Button title="Cadastrar nova consulta" onPress={() => navigation.navigate('Nova Consulta')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    card:{
        margin: 10, 
    }
})