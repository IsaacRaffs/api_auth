import React from 'react'
import './Image.css'

const api_url = 'http://127.0.0.1:8000/media/'

const Image = ({data, className}) => {
    let lista_imagens = []

    if (data !== null){
        const img = data.toString()
        lista_imagens = img.split(',')
        
        if (lista_imagens[0] === ''){
            lista_imagens.pop()
        }


    }
    
    
  return (
    <div>
        {lista_imagens.length > 0 ? lista_imagens.map(imagem => (
            <img src={api_url + imagem} alt='Imagem de questão' className={className}/>
        )) : <></>}
    </div>
  )
}

export default Image