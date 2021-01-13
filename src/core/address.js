
  export const nameValidator = name => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';
  
    return '';
  };
  export const numberValidator = number => {
      const re=/^[56789]\d{9}$/;
    if (!number || number.length !== 10) return ' Phone Number must be 10 digit';
    if(!re.test(number)) return 'Enter valid phone Number'
  
    return '';
  };
  
  export const pinValidator = number => {
    const re=/^[1-9]{1}[0-9]{2}[0-9]{3}$/;
  if (!number || number.length !== 6) return 'PinCode must be 6 digit';
  if(!re.test(number)) return 'Enter valid PinCode'

  return '';
};
  export const dataValidator = data => {
    if (!data || data.length <= 0) return 'Please provide the necessary detials';
  
    return '';
  };
  
  