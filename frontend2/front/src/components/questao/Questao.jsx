import React from 'react'
import './Questao.css'

const Questao = ({data}) => {
  return (
    <div>
        <ol>
            {data.map(questao => (
            <><p key={questao.id}>({questao.ano}) {questao.materia} - {questao.assunto}</p><li className="questao">
                    <p>{questao.contexto}</p>
                    <p>{questao.pergunta}</p>
                    <ol type='a'>
                        <li>{questao.letra_a}</li>
                        <li>{questao.letra_b}</li>
                        <li>{questao.letra_c}</li>
                        <li>{questao.letra_d}</li>
                        <li>{questao.letra_e}</li>
                    </ol>
                    <br />
                    <p>Resposta certa -- {questao.answer}</p>
                </li></>
            ))}
        </ol>
    </div>
  )
}

export default Questao