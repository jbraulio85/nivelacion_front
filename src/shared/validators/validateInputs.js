export const validatePassword = (password) => {
  const regex = /^\S{6,12}$/;

  return regex.test(password);
};

export const validatePasswordConfig = (pass, confPass) => {
  return pass === confPass;
};

export const validateUsername = (username) => {
  const regex = /^\S{3,8}$/;

  return regex.test(username);
};

export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
