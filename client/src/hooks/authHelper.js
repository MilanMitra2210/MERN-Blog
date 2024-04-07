import { useState } from 'react';

const useEmailValidation = () => {
  const [isValid, setIsValid] = useState(false);

    const validateEmail = (e) => {
        const email = e.target.value;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setIsValid(emailRegex.test(email));
    };

  return { isValid, validateEmail };
};

const usePasswordValidation = () => {
  const [isValid, setIsValid] = useState(false);

  const validatePassword = (e) => {
    const password = e.target.value;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    setIsValid(passwordRegex.test(password));
  };

  return { isValid, validatePassword };
};

export { useEmailValidation, usePasswordValidation };
