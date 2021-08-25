const bcrypt = require('bcrypt');

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateNewUser = async (userData) => {
  try {
    console.log('            🚷 validating new user for:', userData.email, userData.password)
    const { password, firstname, lastname, email } = userData
    if (email === '') return('Email address is missing');
    const validEmail = validateEmail(email)
    if (!validEmail) return('Email format is invalid')
    if (firstname.length < 2) return('First Name must be at least 2 characters');
    if (lastname.length < 2) return('Last Name must be at least 2 characters');
    if (password === '' ) return ('Missing password!');
    if (password.length < 4) return ('Password must be at least 4 characters long')

    const hashed = await encryptPw(password)
    const newUser = ({
      email,
      password: hashed,
      firstname,
      lastname,
    });
    console.log('            🚷 validatiion Successful for:', newUser.email)
    return newUser;
  } catch (err) {
    console.log('validation: 🚷', err)
    return err
  }
}

const encryptPw = async (pw) => {
  try {
    const hash = await bcrypt.hash(pw, 10)
    return hash
  } catch (err) {
    console.log(err)
    throw new Error('validation: 🚷 Hashing Err:', err);
  }
}

const validateOldUser = async (user, email, password) => {
  console.log('            🚷 validating old user')
  console.log('validating: 🚷 >', user.email, 'with', email, '<')
  console.log('validating: 🚷 > hash with', password, '<')
  try {
    if (user.email !== email) return('validation: 🚷 the correct email is ', user.email)
    const validatedPw = await bcrypt.compare(password, user.password);
    validatedPw ? console.log('validation: 🚷 you passed') : console.log('validation: 🚷 you failed');
    return validatedPw
  } catch (err) {
    console.log('validation: 🚷 comparison ERR', err);
    throw new Error('validation: 🚷 Hashing Comparison Err:', err);
  }
}

module.exports = { validateNewUser, validateOldUser }
