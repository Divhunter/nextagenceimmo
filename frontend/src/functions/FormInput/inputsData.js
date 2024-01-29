
const nameRegex = /^[a-zA-ZÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâæçèéêëìíîïñòóôõöùúûüý -]+$/
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
const phoneRegex = /^\+?\d{9,14}(?:[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})?$/;
const messageRegex = /^[a-zA-ZÀÁÂÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâæçèéêëìíîïñòóôõöùúûüý0-9]+(?:['\s\-?,:!%"@;’=°_'"()&$€.a-zA-Zéèêîçàôïûù0-9]+)*$/
const noAuthorizeChar = /^[^{}|<|>|`]*$/


export const inputs = [
  {
    id: 1,
    name: "firstName",
    errorName: "firstNameError",
    type: "text",
    placeholder: "Prénom*",
    label: "FirstName",
    // required: true,
  },
  {
    id: 2,
    name: "lastName",
    errorName: "lastNameError",
    type: "text",
    placeholder: "Nom*",
    label: "LastName",
    // required: true,
  }
  ,
  {
    id: 3,
    name: "email",
    errorName: "emailError",
    type: "email",
    placeholder: "Email*",
    label: "Email",
    // required: true,
  }
  ,
  {
    id: 4,
    type: 'text',
    name: 'phone',
    errorName: "phoneError",
    placeholder: 'Téléphone*',
    label: "Phone",
    // required: true,
  }
  ,
  {
    id: 5,
    type: 'text',
    errorName: "messageError",
    name: 'message',
    placeholder: 'Message',
    label: "Message",
    rows: '4',
    cols: '50',
    maxLength: 500
  }
];


export const handleValidation = (values, errors, setErrors, setIsValidForm, focusedFields) => {
  const newErrors = {
    firstNameError: [],
    lastNameError: [],
    emailError: [],
    phoneError: [],
    messageError: [],
  };
  let isValid = true;

  const validateField = (value, fieldName, regex) => {
    if (!regex.test(value)) {
      newErrors[`${fieldName}Error`].push(`Le champ ${fieldName} est invalide`);
      isValid = false;
    }
  };

  const fields = ["firstName", "lastName", "email", "phone", "message"];

  fields.forEach((field) => {
    const focusedFieldNotEmpty = focusedFields[field] && values[field].length > 0;
    const fieldValueNotEmpty = values[field] !== "";
    const fieldValue = values[field];
    switch (field) {
      case "firstName":
        if (!values[field]) {
            newErrors[`${field}Error`].push(`Le prénom est vide`);
            isValid = false;
          } else if (fieldValue.length < 3 || fieldValue.length > 30) {
            newErrors[`${field}Error`].push("Le prénom doit contenir 3 à 30 caractères.");
            isValid = false;
          } else {
            validateField(fieldValue, field, nameRegex);
          }
        
        break;
      case "lastName":
        if (!values[field]) {
            newErrors[`${field}Error`].push(`Le nom est vide`);
            isValid = false;
          } else if (fieldValue.length < 3 || fieldValue.length > 30) {
            newErrors[`${field}Error`].push("Le nom doit contenir 3 à 30 caractères.");
            isValid = false;
          } else if (!noAuthorizeChar.test(fieldValue)) {
            newErrors[`${field}Error`].push("Le nom contient des caractères non autorisés.");
            isValid = false;
          } else {
            validateField(fieldValue, field, nameRegex);
          }
        
        break;
      case "email":
        if (!values[field]) {
            newErrors[`${field}Error`].push(`L'email est vide`);
            isValid = false;
          } else if (!noAuthorizeChar.test(fieldValue)) {
            newErrors[`${field}Error`].push("L'email contient des caractères non autorisés.");
            isValid = false;
          } else {
            validateField(fieldValue, field, emailRegex);
          }
        
        break;
      case "phone":
        if (!values[field]) {
            newErrors[`${field}Error`].push(`Le télephone est vide`);
            isValid = false;
          } else if (fieldValue.length < 9 || fieldValue.length > 14) {
            newErrors[`${field}Error`].push("Le téléphone doit contenir 9 à 14 caractères.");
            isValid = false;
          } else if (!noAuthorizeChar.test(fieldValue)) {
            newErrors[`${field}Error`].push("Le télephone contient des caractères non autorisés.");
            isValid = false;
          } else {
            validateField(fieldValue, field, phoneRegex);
          }
        
        break;
      case "message":
        if ((focusedFieldNotEmpty && fieldValue.length > 0) || fieldValueNotEmpty) {
          if (!noAuthorizeChar.test(fieldValue)) {
            newErrors[`${field}Error`].push("Le message contient des caractères non autorisés.");
            isValid = false;
          } 
          // else if (fieldValue.length !== 0) {
          //   validateField(fieldValue, field, messageRegex);
          // }
        }
        break;
      default:
        break;
    }
  });

  const finalErrors = {
    ...errors,
    ...newErrors,
  };

  setErrors(finalErrors);
  setIsValidForm(isValid);
  return isValid;
};


