import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/projet`;
export const getAllProjets = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(API_URL, { headers });
    const projets = response.data;
    // console.log("projet:",projets.data)
    return projets;
  } catch (error) {
    console.log('error lors de la récupération des projets:', error)
    return error;
  }
};


// Obtenir un projet par son email pour verifier si un email exist ou pas
export const getProjetByEmail = async (email) => {
  try {

    const exist = await axios.get(`${API_URL}?email=${email}`);
    return exist;
  } catch (error) {
    return error;
  }
};
// Supprimer un projet par son ID
export const deleteProjet = async (projetId, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,

    };
   const userDeleted = await axios.delete(`${API_URL}?projetId=${projetId}`, { headers });
   return userDeleted;
  } catch (error) {
    console.error('Erreur lors de la suppression du projet :', error);
    return error;
  }
};

const handleSuccessResponse = (response) => {
  switch (response.status) {
    case 201:
      return { success: true, data: response.data };
    case 400:
      return { success: false, error: 'Erreur de validation des données.' };
    case 404:
      return { success: false, error: 'Ressource non trouvée.' };
    case 500:
      return { success: false, error: 'Erreur interne du serveur.' };
    default:
      return { success: false, error: 'Une erreur inattendue s\'est produite.' };
  }
};

const handleErrorResponse = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    console.log("err:", data)
    if (status === 403) {
      return {
        success: false,
        type: 'captcha',
        error: data.error,
        message: data.message,
      };
    } else if (status === 400) {
      const errorMessages = Array.isArray(data.message)
        ? data.message.map((error) => error)
        : [data.error];
      console.log("400:", errorMessages)
      return { success: false, errorMessages };
    } else {
      console.error('Error response:', data);
      return { success: false, error: 'Erreur inattendue du serveur.' };
    }
  } else if (error.request) {
    console.error('Request error:', error.request);
    return { success: false, error: 'La requête n\'a pas pu être envoyée.' };
  } else {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Une erreur inattendue s\'est produite.' };
  }
};

export const createProjet = async (projetData) => {
  try {
    const response = await axios.post(`${API_URL}/new`, projetData);
    // console.log("res:",response)
    return handleSuccessResponse(response);
  } catch (error) {
    return handleErrorResponse(error);
  }
};


// export const createProjet = async (projetData) => {

//   try {
//     const response = await axios.post(`${API_URL}/new`, projetData);
//     console.log("response:", response)

//     if (response.status === 201) {
//       // Succès de la création du projet
//       return { success: true, data: response.data };
//     } else {
//       // Le serveur a renvoyé une réponse avec un code d'erreur
//       return { success: false, error: 'Une erreur est survenue lors de la demande.' };
//     }

//   } catch (error) {
//     console.log('lerreur', error.response.data)
//     const responseData = error.response.data;
//     if (error.response) {
//       if (responseData.success === false) {
//         const errorMessages = [];
//         errorMessages.push(responseData.error)
//         console.log('les 500 errors:', errorMessages)
//         return { success: false, errorMessages };
//       } 
//       if (error.response.status === 403) {
//         return { success: false,type:'captcha', error: error.response.data.error, message: error.response.data.message };
//       }else 

//       if (error.response.status === 400) {
//         const errorMessages = responseData.error.map((error) => error.msg);
//         console.log('les erreurs:', responseData)
//         return { success: false, errorMessages };
//       } 

//     } else if (error.request) {
//       // La requête elle-même a échoué
//       console.log('error:', error)
//       return { success: false, error: 'La requête n\'a pas pu être envoyée.' };
//     } else {
//       // Une erreur inattendue s'est produite
//       return { success: false, error: 'Une erreur inattendue s\'est produite.' };
//     }
//   }
// };


export const isReadProjet = async (projetId, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,

    };
    const response = await axios.put(`${API_URL}/read?projetId=${projetId}`, { headers });
    return response
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet comme lu :', error);
    return error;
  }
};