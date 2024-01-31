import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// styles
import './m-uploader.css'

const Uploader = () => {

    const upLoading = () => {
        fetch('documents/hlanders.pdf').then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'documents.pdf';
                alink.click();
            })
        })
    }
	return (
        <div className='container-downlaod'>
            <FontAwesomeIcon 
            className='container-downlaod__download'
            onClick={upLoading} 
            icon={faDownload}  
            />
            <p className='container-downlaod__text'>
                <strong>
                    Téléchargez le CV complet ainsi que l'ensemble des recommandations dans leur contenu intégral avec coordonnées au format pdf.
                </strong>
            </p>
        </div>
	)
}

export default Uploader
