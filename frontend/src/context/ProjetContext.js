import React, { createContext, useState } from 'react'
import { getAllProjets, deleteProjet, isReadProjet } from '../services/projetServices'

export const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const [projets, setProjets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const token = localStorage.getItem('token')

  // Récupérer tous les projets
  const fetchProjets = async () => {
    if (token) {
      let timerId;
      try {
        const response = await getAllProjets(token);
        // console.log(response);
        setProjets(response.data);
        timerId = setTimeout(() => {
          setIsLoading(false); // Fin du chargement après 3 secondes
        }, 3000); // Définir le délai de 3 secondes (3000 ms)
      } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        clearTimeout(timerId); // En cas d'erreur, annuler le délai
        setIsLoading(false); // Arrêter le chargement
      }
    }
  };


  // Supprimer un projet
  const handleDeleteProjet = async (projetId) => {
    setDeleteLoading(true)
    if (token) {
      try {
        const response = await deleteProjet(projetId, token);
        if (response?.status === 200) {
          // Mettez à jour la liste des projets localement en la filtrant pour exclure le projet supprimé
          setProjets((prevProjets) =>
            prevProjets.filter((projet) => projet.id !== projetId)
          );
          setDeleteLoading(false)
        }
      } catch (error) {
        setDeleteLoading(false)
        console.error('Erreur lors de la suppression du projet :', error)
      }
    }
  };


  const handleIsReadProjetProjet = async (projetId) => {
    if (token) {
      try {
        // Mettre à jour le champ 'isRead' sur le serveur
        const isRead = await isReadProjet(projetId, token);
        // Mettre à jour localement le champ 'isRead' dans les données du projet dans le contexte
        if (isRead) {
          const updatedProjects = projets.map(project => {
            if (project.id === projetId) {
              return { ...project, isRead: true };
            }
            return project;
          });
          setProjets(updatedProjects);
        }

        // Mettre à jour l'état des projets dans le contexte avec le champ 'isRead' mis à jour
      } catch (error) {
        console.error('Erreur lors de la mise à jour du projet comme lu :', error);
      }
    }
  };


  return (
    <ProjectContext.Provider value={{ projets, isLoading, setIsLoading, fetchProjets, handleDeleteProjet, setProjets, handleIsReadProjetProjet, deleteLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};
