import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DadosLoginProvider } from './source/providers/DadosLogin.js';

//screens
import Login from './source/Login.js';
import Consultas from './source/Consultas.js';
import NovaConsulta from './source/NovaConsulta.js';
import DetalhesConsulta from './source/DetalhesConsulta.js';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(30,144,255)',
    background: 'rgb(242, 242, 242)',
    card: '#f28080',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default function App() {
  return (
    <DadosLoginProvider>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{title: '', headerTransparent: true}} />
        <Stack.Screen name="Consultas" component={Consultas} />
        <Stack.Screen name="Nova Consulta" component={NovaConsulta}/>
        <Stack.Screen name="Detalhes Consulta" component={DetalhesConsulta}/>
      </Stack.Navigator>
    </NavigationContainer>
    </DadosLoginProvider>
  );
}
