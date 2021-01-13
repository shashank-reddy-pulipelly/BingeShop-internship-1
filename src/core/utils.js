export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
 
  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
export const numberValidator = number => {
  if (!number || number.length !== 10) return 'Number should be 10 digit';

  return '';
};

export const dataValidator = data => {
  if (!data || data.length <= 0) return 'Please provide the necessary detials';

  return '';
};

