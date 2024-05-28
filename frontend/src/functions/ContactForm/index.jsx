import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Sentry from "react-activity/dist/Dots"
import "react-activity/dist/Dots.css"
import { notifyError, notifySuccess } from '../../context/Notify'
import ReCAPTCHA from 'react-google-recaptcha'
import {AiOutlineCheckCircle} from 'react-icons/ai'

import './m-contact-form.css'
import './d-contact-form.css'

import { createProjet } from '../../services/projetServices';
import CheckboxCustom from '../CheckboxCustom/CheckboxCustom';
import { handleValidation, inputs } from '../FormInput/inputsData';
import FormInput from '../FormInput/FormInput';

const ContactForm = () => {
  const sitekey = process.env.REACT_APP_SITE_KEY_RECAPTCHA


  const captchaRef = useRef()
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState([]);

  const [errorsGlobal, setErrorsGlobal] = useState([])


  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [isValidForm, setIsValidForm] = useState(true)

  const [acceptError, setAcceptError] = useState([])
  const [accepterConditions, setAccepterConditions] = useState(false)

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: [],
    lastNameError: [],
    emailError: [],
    phoneError: [],
    messageError: [],
  });
  const [focusedFields, setFocusedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // handleValidation({ ...values, [name]: value },errors, setErrors, setIsValidForm,focusedFields);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setFocusedFields({ ...focusedFields, [name]: true });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFocusedFields({ ...focusedFields, [name]: false });
  };
  // Création des données avec l'état de focus pour chaque champ du formulaire
  const inputsWithFocus = inputs.map((input) => ({
    ...input,
    focused: focusedFields[input.name], // Ajout de la propriété focused
    errorMessage: errors[input.errorName]
  }));

  useEffect(() => {
    const fields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'message'
    ];

    fields.forEach((field) => {
      if (focusedFields[field] || values[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`${field}Error`]: [''],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`${field}Error`]: prevErrors[`${field}Error`],
        }));
      }
    });
  }, [focusedFields, values]);


  //Reinitialier les erreurs s'il existe au bout de quelques secondes après
  useEffect(() => {
    if ((errorsGlobal.length > 0) ||
      Object.values(errors).some(errorArray => errorArray.length > 0)) {
      const timer = setTimeout(() => {
        setErrors({
          firstNameError: [],
          lastNameError: [],
          emailError: [],
          phoneError: [],
          messageError: [],
        });
        setErrorsGlobal([]);
        setCaptchaError([]);
        setAcceptError([]);

      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [errorsGlobal, errors]);
  // Afficher le message de success juste pendant 15 secondes
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [success]);


  useEffect(() => {
    if (captchaValue) {
      setCaptchaError([])
    }
    if (accepterConditions) {
      setAcceptError([])
    }
  }, [accepterConditions, captchaValue])

  const handleAccepterConditionsChange = (event) => {
    setAccepterConditions(event.target.checked)
  };

  const handleRecaptchaChange = (value) => {
    // Stockez la valeur de la réponse CAPTCHA dans l'état local
    setCaptchaValue(value)
  };
  // Style pour le fond du bouton
  const buttonStyle = {
    background: `rgb(255, 145, 0)`
  };

  const handleFormReset = () => {
    // Réinitialise les valeurs à une chaîne vide 
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setAccepterConditions(false)
    captchaRef.current.reset()
  }

  //console.log('valide:', isValidForm)

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const isValid = handleValidation(values, errors, setErrors, setIsValidForm, focusedFields);
    // const isValid = true
    if (!accepterConditions) {
      setAcceptError(["Vous devez accepter nos conditions et notre politique de confidentialité."]);
      setLoading(false);
      return;
    }
  
    if (!captchaValue) {
      setCaptchaError(["Vous devez vérifier que vous n'êtes pas un robot."]);
      setLoading(false);
      return;
    }
  
    if (captchaValue && accepterConditions && isValid) {
      setLoading(true);
  
      const projetData = {
        ...values,
        "recaptchaResponse": captchaValue,
      };
  
      try {
        const result = await createProjet(projetData);
  
        if (!result) {
          notifyError('Pas de réponse du serveur');
          setLoading(false);
          return;
        }
  
        if (result.success) {
          setSuccess(true);
          handleFormReset();
        } else {
          setErrorsGlobal(result.error ? [result.error] : result.errorMessages);
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la création du projet :', error);
        notifyError('Une erreur s\'est produite. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    captchaRef.current.reset()
  };
  

  return (
    <Fragment >
      <form
        onSubmit={handleSubmit}
        id='form'
        className='form form-contact'
        name='contact'
        method='post'
      >
        {inputsWithFocus.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={(e) => handleChange(e)}
            onFocus={(e) => handleFocus(e)}
            onBlur={(e) => handleBlur(e)}
            focused={focusedFields[input.name]}
          />
        ))}

        <div className="contact-legal">
          <div className="contact-legal-content">
            <CheckboxCustom checked={accepterConditions} size={'26'}
              handleCheckedChange={handleAccepterConditionsChange} />

            <span className='contact-legal-content__text'>
              <i className='contact-legal-content__text__politique'>
                En soumettant ce formulaire j'accepte que les informations
                saisies soient exploitées dans le cadre de la demande de contact
                et/ou de la relation contractuelle qui peut en découler.
                Veuillez consulter&nbsp;

                <Link to='https://www.2brealisation.com/cgu' className='contact-legal-content__text__link'>
                  notre politique de confidentialité
                </Link>
                .
              </i>
            </span>
          </div>
          {acceptError && acceptError.map((er, index) => (
            <span key={index} className='error-message'>{er}</span>
          ))}
        </div>

        <div className="recaptcha">
          <span className="label-recap" >Veiller cocher la case ci-dessous pour
            continuer</span>
          <ReCAPTCHA
            sitekey={sitekey}
            onChange={handleRecaptchaChange}
            ref={captchaRef}
          />
          {captchaError && captchaError.map((er, index) => (
            <span key={index} className='error-message'>{er}</span>
          ))}
        </div>
        {
          errorsGlobal.length !== 0 && <ul className='global-error'>
            {
              errorsGlobal.map((err, index) => (
                <li key={index} className='error-message' > {err} </li>
              ))
            }
          </ul>
        }
        {
          success && <div className='alert-success'>
            <AiOutlineCheckCircle size={30} />
            <span>
              <span>Votre message a bien été envoyé.</span>
              <span>Nous vous contacterons dans les plus brefs délais.</span>
            </span>
          </div>
        }

        <button
          type='submit'
          style={buttonStyle}
          className={`contact-submit formSubmit`}>
          {
            loading ? <Sentry size={22} speed={1} animating={true} /> :
              <span>Envoyer</span>
          }
        </button>

      </form>
    </Fragment>
  )
}

export default ContactForm