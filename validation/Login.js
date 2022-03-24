import Validator from 'validator';
import isEmpty from 'is-empty';

export const validateLoginInput = (data) => {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  const username = !isEmpty(data.username) ? data.username : '';
  const password = !isEmpty(data.password) ? data.password : '';

  // Empty checks
  if (Validator.isEmpty(username)) errors.username = 'Username field is required.';
  if (Validator.isEmpty(password)) errors.password = 'Password field is required.';

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;