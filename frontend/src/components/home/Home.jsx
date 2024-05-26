import React from "react";
import Main from "../template/Main";

export default props => 
    <Main icon="home" title="Inicio"
        subtitle="Segundo projeto de React">
            <div className='display-10'>Bem vindo</div>
            <hr />
            <p className='mb-0'>Este é um site para testar minhas habilidades,
             então, terá algumas coisas que voces podem fazer, exemplo:
             <ul>
                <li>
                    Fazer um comentario na aba "Comentarios"
                </li>
                <li>
                    Criar seu usuario na aba "Usuários"
                </li>
                <li>
                    Deixar uma nota na aba "Notas"
                </li>
             </ul>
             </p>
        </Main>
