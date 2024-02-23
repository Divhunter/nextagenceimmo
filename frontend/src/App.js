import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ScrollToTop from './functions/ScrollToTop'
import { Routes, Route } from 'react-router-dom'
import PublicRouter from './public/PublicRouter'
import AdminRouter from './admin/AdminRouter'
import BiensContainer from './public/components/BiensContainer'
import BiensCard from './public/components/BiensCard'
import Error from './_utils/Error'
import CGU from './public/components/CGU'
import Contact from './public/components/Contact'

// styles
import './styles/m-app.css'
import './styles/t-d-app.css'

import { ProjectContext } from './context/ProjetContext'
import { AuthContext } from './context/AuthContext'

import addNotification from 'react-push-notification'
import notifSound from './_utils/notifSound.wav'
import logo from './_utils/logo-icon.png'
import io from 'socket.io-client';


const App = () => {

    const [biensArray, setBiensArray] = useState([])
    const { projets, setProjets } = useContext(ProjectContext)
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    const navigate = useNavigate()

    const [selectionArray, setSelectionArray] = useState([]);

    useEffect(() => {
        const getData = async () => {
        try {
            const res = await axios.get('/datas/biensArray.json');
            setSelectionArray(res.data)

            // Sauvegarder dans le local storage
            localStorage.setItem('biensArray', JSON.stringify(res.data))
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des données.", error)
            navigate('/Error', { state: { message: "Nous ne pouvons pas récupérer les données" } })
        }
        }

        getData()
        // eslint-disable-next-line
    }, [])

    // const sendNotifAndSound = (firstName) => {
    //     addNotification({
    //         title: '2BRealisation',
    //         message: `${firstName} vous a envoyé un message`,
    //         duration: 7000,
    //         icon: logo,
    //         native: true,
    //         onClick: () => window.location = process.env.REACT_APP_DASHBOARD_URL_NEW
    //     })
    //     // Jouer un son
    //     setTimeout(() => {
    //         const audio = new Audio(notifSound);
    //         audio.play();

    //     }, 100);
    // }

    // useEffect(() => {
    //     const socket = io(process.env.REACT_APP_API_URL);
    //     if (isAuthenticated === true) {

    //         socket.on('connect', () => {
    //             console.log('Connected to server');
    //         });

    //         // Écoute des nouveaux projets et affichage de notification
    //         socket.on('nouveauProjet', (newProjet) => {
    //             // Créer un nouveau tableau avec les anciens projets et le nouveau projet
    //             const updatedProjets = [...projets, newProjet];
    //             setProjets(updatedProjets);
    //             console.log('New data from server:', newProjet);
    //             sendNotifAndSound(newProjet.firstName)
    //             socket.on('disconnect', () => {
    //                 console.log('Disconnected from server');
    //             });
    //         });
    //         // Écoute des nouveaux messages si le projet existe et affichage de notification
    //         socket.on('updatedProjet', (updatedProjet) => {
    //             // Mettre à jour l'état local pour refléter le nouveau projet
    //             const updatedProjets = projets.map((projet) => {
    //               if (projet._id === updatedProjet._id) {
    //                 return updatedProjet;
    //               }
    //               return projet;
    //             });
          
    //             setProjets(updatedProjets);
    //             sendNotifAndSound(updatedProjet.firstName)
    //             console.log('New data from server:', updatedProjet);
    //           });
    //     }

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [projets, isAuthenticated]);

    return (
        <div>
            <Routes>
                <Route exact path='/*' element={ <PublicRouter /> } />
                <Route path='/dashboard/*' element={ <AdminRouter /> } />
                <Route path='/Contact/:Id' element={ <Contact /> } />
                <Route path='/biensContainer' element={ <BiensContainer /> } />
                <Route path='/biensCard/:Id' element={<BiensCard />} />
                <Route path='/CGU' element={ <CGU /> } />
                <Route path='*' element={ <Error /> } />
            </Routes>
            <ScrollToTop />
        </div>
    )
}

export default App