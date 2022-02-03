import { createContext, useState } from "react";

export const DadosLoginContexto = createContext([]);

//context responsável por armazenar os dados do login

export const DadosLoginProvider = (props) => {
    const [dadosLogin, setDadosLogin] = useState([]);

    return(
        <DadosLoginContexto.Provider value={{dadosLogin, setDadosLogin}}>
            {props.children}
        </DadosLoginContexto.Provider>
    )
}