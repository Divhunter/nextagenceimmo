import React from 'react';
import { faDownload, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Uploader = () => {
    const documents = [
        {
            "name": "liste-pieces-joindre.pdf",
            "designation": "Liste des pièces à joindre"
        },
        {
            "name": "mandatSepa.pdf",
            "designation": "Mandat de prélèvement SEPA"
        },
        {
            "name": "dedite.docx",
            "designation": "Modèle dédite"
        },
        {
            "name": "ficheRenseignements.pdf",
            "designation": "Fiche de renseignements"
        }
]

const upLoading = (doc) => {
    fetch(`doc/${doc.name}`).then(response => {
        response.blob().then(blob => {
            const fileURL = window.URL.createObjectURL(blob)
            let alink = document.createElement('a')
            alink.href = fileURL
            alink.download = doc.name
            alink.click()
        })
    })
}

const downloadAll = () => {
    documents.forEach(doc => upLoading(doc))
}

return (
        <section className='uploader'>
            <div className='pagination'>
                <FontAwesomeIcon icon={faDownload} />
            </div>
            <header>
                à votre disposition
            </header>
            <br/>
            {documents.map((doc, index) => (
                <p
                    key={index}
                    className='uploder__content'
                >
                    {doc.designation} <span onClick={() => upLoading(doc)}><FontAwesomeIcon icon={faFileArrowDown} /></span>
                    <br/><br/>
                </p>
            ))}
            <br/>
            <br/>
            <p 
                onClick={downloadAll}
                className='button'>
                    Tout télécharger
            </p>
        </section> 
    )
}

export default Uploader