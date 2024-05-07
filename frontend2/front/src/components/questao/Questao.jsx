import React from 'react'
import './Questao.css'
import Image from '../images/Image'

const Questao = ({data}) => {
  return (
    <div>
        <ol>
            {data.map(questao => (
            <><p>({questao.ano}) {questao.materia} - {questao.assunto}</p>
            <li className="questao" key={questao.id}>
                    <p>{questao.contexto}</p>
                    <Image data={questao.imagens} className={'imagem_contexto'}/>
                    <p>{questao.pergunta}</p>
                    <ol type='a'>
                      {questao.letra_a.includes('enem-data') ? 
                        <>
                        <li><Image data={questao.letra_a} className={'imagem_alternativa'}/></li>
                        <li><Image data={questao.letra_b} className={'imagem_alternativa'}/></li>
                        <li><Image data={questao.letra_c} className={'imagem_alternativa'}/></li>
                        <li><Image data={questao.letra_d} className={'imagem_alternativa'}/></li>
                        <li><Image data={questao.letra_e} className={'imagem_alternativa'}/></li>
                        </>
                        :
                        <>
                        <li>{questao.letra_a}</li>
                        <li>{questao.letra_b}</li>
                        <li>{questao.letra_c}</li>
                        <li>{questao.letra_d}</li>
                        <li>{questao.letra_e}</li>
                        </>
                      }
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