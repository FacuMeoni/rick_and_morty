export function validateErrors ({ type }) {

  if(type === 'Conflict Error')return 'This username is already taken, please choose another one.';

  if(type === 'Authorization Error')return 'Wrong username or password, please try again.'

  return 'An unexpected error occurred, please try again later.' 
}