import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { login } from "../../services/authServices"
import { AuthContext } from "../../context/AuthContext"
import { notifySuccess } from "../../context/Notify"
import Sentry from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
// styles
import "./m-login.css"

const Login = () => {
    const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);

    const [errorEmail, setErrorEmail] = useState([])
    const [errorPassword, setErrorPassword] = useState([])
    const [errorMessages, setErrorMessages] = useState([])
    const [showPassword, setShowPassword] = useState(false);


    const validationSchema = Yup.object({
        email: Yup.string()
            .email("email invalide")
            .required("L'email est obligatoire"),
        password: Yup.string().required("Le mot de passe est obligatoire"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            auth(values.email, values.password)
        },
    });

    const ERROR_MESSAGES = {
        UNAUTHORIZED_ROLE: "Vous n'avez pas le rôle pour vous connecter.",
        INVALID_CREDENTIALS: "Identifiants invalides.",
        OTHER_ERROR: "Une erreur est survenue lors de l'authentification.",
    };

    const auth = async (email, password) => {
        setErrorMessages([]);
        setIsLoading(true);

        try {
            const result = await login(email, password);

            if (result.success === false) {
                const errors = result?.error;
                if (errors.status === 401 || errors.status === 404) {
                    console.log(errors.data.message)
                    setErrorMessages([errors.data.message ]);
                } else {
                    setErrorMessages([errors.data.message || ERROR_MESSAGES.OTHER_ERROR]);
                }
            } else {
                const data = result.response.data;
                const token = data.access_token;

                if (data.user && data.user.role === 'admin') {
                    localStorage.setItem("token", token);
                    setIsAuthenticated(true);
                } else {
                    setErrorMessages([ERROR_MESSAGES.UNAUTHORIZED_ROLE]);
                }
            }
        } catch (error) {
            setErrorMessages([ERROR_MESSAGES.OTHER_ERROR]);
            // console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    const onChangeColor = (e) => {
        if (e.target.focus() === true) {
            e.target.style.backgroundColor = "white"
        }
    }

    const onFocusColor = (e) => {
        e.target.style.backgroundColor = "white"
    }

    const onBlurColor = (e) => {
        if (e.target.value !== "") {
            e.target.style.backgroundColor = "white"
        } else {
            e.target.style.backgroundColor = "rgba(0, 62, 88, 0.4)"
        }
    }

    const onBlurErrorEmail = () => {
        if (document.getElementById('email').style.backgroundColor === 'rgba(0, 62, 88, 0.4)') {
            formik.touched.email = null
            formik.errors.email = null
            setErrorEmail('')
        }
    }
    const onBlurErrorPassword = () => {
        if (document.getElementById('password').style.backgroundColor === 'rgba(0, 62, 88, 0.4)') {
            formik.touched.password = null
            formik.errors.password = null
            setErrorPassword('')
        }
    }

    // Cette fonction réinitialisera errorMessages après 5 secondes s'il n'est pas vide

    // Utilisez useEffect pour appeler la fonction resetErrorMessages lorsque errorMessages change
    useEffect(() => {
        window.scrollTo(0, 0)
        const resetErrorMessages = () => {
            if (errorMessages) {
                setTimeout(() => {
                    setErrorMessages("")
                }, 15000); // Réinitialiser après 5 secondes (5000 millisecondes)
            }
        }
        resetErrorMessages()
        // logout()
    }, [errorMessages])

    if (isAuthenticated) {
        return <Navigate to="/dashboard/costumers" />
    } else
        return (
            <section className="login">
                <p className="login__header">
                    Cet espace est strictement réservé à l'administrateur du site.
                    <br />
                    Veuillez retourner à la <a href="https://www.mutuact.fr/">page d'accueil</a>.
                </p>
                <h1 className="login__title">Connexion</h1>
                <form
                    onSubmit={formik.handleSubmit}
                    id="form-login"
                    className=" form-login"
                    method="post"
                >
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={(e) => { formik.handleChange(e); onChangeColor(e); setErrorEmail('') }}
                            onBlur={(e) => { formik.handleBlur(e); onBlurColor(e); onBlurErrorEmail() }}
                            onFocus={(e) => { formik.handleBlur(e); onFocusColor(e); }}
                            id='email'
                            type='text'
                            name='email'
                            placeholder='Email*'
                            className='form-control'
                            aria-label='email'
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className='error-message'>{formik.errors.email}</span>
                        ) : null}
                        {errorEmail && <span className='error-message'>{errorEmail}</span>}
                    </div>
                    <div className='input-password'>
                        <div className="password form-group">
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={(e) => { formik.handleChange(e); onChangeColor(e); setErrorPassword('') }}
                                onBlur={(e) => { formik.handleBlur(e); onBlurColor(e); onBlurErrorPassword() }}
                                onFocus={(e) => { formik.handleBlur(e); onFocusColor(e); }}
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password*'
                                className='form-control '
                                aria-label='password'
                            />
                            {
                                formik.values.password && <FontAwesomeIcon
                                    icon={!showPassword ? faEye : faEyeSlash}
                                    className="icon-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            }
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <span className='error-message'>{formik.errors.password}</span>
                        ) : null}
                        {errorPassword && <span className='error-message'>{errorPassword}</span>}
                        {errorMessages && errorMessages.map((error, index) => (
                            <li key={index} className='error-message'>{error}</li>
                        ))}
                    </div>
                    <button className="formSubmit contact-submit" type="submit">
                        {isLoading ? <Sentry color="white" size={25} speed={1} animating={true} /> : 'Se connecter'}
                    </button>

                </form>

            </section>
        )
}

export default Login