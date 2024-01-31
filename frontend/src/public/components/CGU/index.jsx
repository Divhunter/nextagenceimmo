import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import logoNAIS from '../../assets/pictures/icon.png'

// styles
import './m-cgu.css'
import './d-cgu.css'

const CGU = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <section 
            id='cgu'
            className='cgu'>
            <Link to='/'>
                <img 
                    className='cgu__logo-notreagenceimmo' 
                    src={logoNAIS} alt='logo notreagenceimmo' 
                />
            </Link>
            <h1>Mentions légales</h1>

            <h2>Concepteur</h2>
            <p>  
            Vowd.fr
            <br/>
            Idépendant libéral
            <br/>
            siret: 94994281700014
            <br/>
            Siège social : 7 cours Albert Thomas – 69003 (Lyon) - France
            </p>

            <div>-</div>

            <h2>Hébergeur du site & Prestataires</h2>
            <p>
                <strong>Hébergeur : Vercel</strong><br/>
                440 N Barranca Ave #4133 Covina, CA 91723 
            </p>
            <p>
                <strong>Prestataires extérieurs :</strong><br/>
                Google
                Editeur du site
                Cf page « Contact » du présent site Internet
            </p>

            <div>-</div>

            <h2>Propriété intellectuelle</h2>
            <p>
                L’ensemble de ce site relève des législations Françaises et Internationales sur les droits d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés pour les textes, images, photographies, sons, logiciels et éléments graphiques. La reproduction de tout ou partie de ce site quel qu’il soit, est formellement interdite sauf autorisation écrite de l’auteur ou créateur, conformément à l’article L 122-4 du Code de la Propriété intellectuelle.
            </p>

            <div>-</div>

            <h2>
                Crédits
            </h2>
            <p>
                L’ensemble des éléments (logotypes, photographies, illustrations, sons, vidéos, textes…) du présent site Internet appartient au responsable de l’entreprise, ses partenaires ou fournisseurs.
                <br/><br/>
                Si le devis le prévoit, les crédits photos sont Multimed Solutions et /ou Fotolia et / ou 123rf et / ou Unsplash et / ou Freepik et / ou Adobe Stock.
            </p>

            <div>-</div>

            <h2>
                Responsabilités
            </h2>
            <p>
                Le créateur du présent site Internet ainsi que ses partenaires ou fournisseurs ne pourront être tenus responsables d’intrusion, piratage, infection ou conséquence d’utilisation du présent site Internet.
            </p>

            <div>-</div>
            
            <h2>
                Informatique et libertés
            </h2>
            <p>
                Certains services du site nécessitent pour l’internaute de renseigner des données personnelles par le biais de formulaires en ligne. Ces informations sont destinées exclusivement à la société éditrice du présent site Internet.
                <br/><br/>
                L’internaute peut s’y opposer en contactant la société éditrice du site Internet ici. Les internautes disposent d’un droit d’accès, de rectification et de suppression des données les concernant.
            </p>

            <div>-</div>

            <h2>
                Collecte des données
            </h2>
            <p>
                Notre site internet « notreagenceimmo.com » collecte des données personnelles :
                Quand vous nous contactez à l’aide d’un de nos formulaires.
                Quelles sont les données collectées et pourquoi ?
                Uniquement des informations nécessaires à notre échange telles que : votre nom, prénom, adresse email, téléphone.
                <br/><br/>
                Les données marquées par un astérisque, ou la mention « (obligatoire) », dans le formulaire de contact doivent obligatoirement être fournies. Dans le cas contraire, nous serions dans l’incapacité d’apporter une réponse à votre demande. Notre site est sécurisé en « https » afin d’assurer la protection des données échangées.
            </p>

            <div>-</div>

            <h2>
                Usage & Durée de conservation des données
            </h2>
            <p>
                Afin de préserver la confidentialité des données collectées, ces dernières seront uniquement destinées à un usage interne, dans le cadre du traitement de votre demande et de la relation commerciale pouvant en découler.
                <br/><br/>
                Ces données seront conservées pendant une durée de 1 an à compter de leur création. Cette durée est déterminée à des fins de communication et d’archive.
            </p>

            <div>-</div>

            <h2>
                Comment voir ou supprimer mes données ?
            </h2>
            <p>
                Raison Sociale : NOTREAGENCEIMMO
                <br/><br/>
                Adresse du siège social : 165 Rte de Vienne, 69008 Lyon - France
                <br/><br/>
                Pour toute demande relative à vos données personnelles, vous pouvez nous contacter directement (via notre formulaire de contact) afin de consulter ou demander la suppression de ses données collectées. Nous vous répondrons dans un délai de 30 jours.
            </p>

            <div>-</div>

            <h2>
                Utilisations de cookies
            </h2>
            <p>
                Ce site nécessite l’utilisation de cookies (marqueur témoin). Des informations non personnelles sont enregistrées par ce système, elles n’ont aucune signification en dehors de leur utilisation sur le présent site Internet. L’internaute peut refuser ces cookies ou les supprimer. Nous vous conseillons de consulter l’aide de votre navigateur pour connaître la marche à suivre.
                <br/><br/>
                Des mesures du nombre de visites, de pages vues ainsi que l’activité des visiteurs sur le site et leur fréquence de retour sont effectuées sur le présent site Internet.
            </p>

            <div>-</div>

            <h2>
                Gestion des cookies
            </h2>
            <p>
                Nous utilisons des cookies et middlewares persistants afin d’améliorer l’expérience utilisateur. Ces cookies sont conservés sur votre ordinateur même après fermeture de votre navigateur et réutilisés lors de vos prochaines visites sur notre site.
                <br/><br/>
                Cookies de sessions et middlewares présents sur ce site :
                <br/><br/>
                Cookie de session et middlewares propres au package NPM
                <br/><br/>
                Cookies de sessions utilisés par REACT JS
                <br/><br/>
                Cookies de personnalisation et middlewares de Wowd.fr
                <br/><br/>
                Cookies d’accès aux serveurs informatiques Vercel.com
                <br/><br/>
                Vous avez la possibilité de désactiver les cookies en vous rendant dans les options de votre navigateur. Cliquez sur le lien correspondant à votre navigateur pour découvrir comment faire :
                <br/>
            </p>
            <br/>
            <li>
                <a 
                    href="https://support.google.com/chrome/answer/95647?hl=fr" 
                    target="_blank" 
                    rel="noopener noreferrer">
                        Google Chrome
                </a>
            </li>
            <br/>
            <li>
                <a 
                    href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" 
                    target="_blank" 
                    rel="noopener noreferrer">
                        Mozilla Firefox
                </a>
            </li>
            <br/>
            <li>
                <a 
                    href="https://support.apple.com/kb/PH17191?viewlocale=fr_FR&amp;locale=en_US" 
                    target="_blank" 
                    rel="noopener noreferrer">
                        Safari
                </a>
            </li>
            <br/>
            <li>
                <a 
                    href="http://help.opera.com/Windows/10.20/fr/cookies.html" 
                    target="_blank" 
                    rel="noopener noreferrer">
                        Opera
                </a>
            </li>
            <br/>
            <li>
                <a 
                    href="https://support.microsoft.com/fr-fr/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11" 
                    target="_blank" 
                    rel="noopener noreferrer">
                        Internet Explorer
                </a>
            </li>
            <br/>
        </section>
    )
}

export default CGU