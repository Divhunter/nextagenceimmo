import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth/login`;


export const login = async (email, password) => {
  const loginDto = {
    email,
    password
  };

  try {
    const response = await axios.post(API_URL, loginDto);
      // console.log("response:", response)
    return { success: true, response };

  } catch (error) {
    // console.error('Erreur de connexion :', error);
    return { success: false, error: error.response };
  }
};

