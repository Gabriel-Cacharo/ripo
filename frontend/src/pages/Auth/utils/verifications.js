export const verifyEmail = (email) => {
  if (!email) {
    return {
      type: 'error',
      message: 'Você deve fornecer um email',
    };
  }

  if (!email.includes('@')) {
    return {
      type: 'error',
      message: 'Forneça um email válido',
    };
  }
};

export const verifyPassword = (password, confirmPassword) => {
  if (!password) {
    return {
      type: 'error',
      message: 'Você deve fornecer uma senha',
    };
  }

  if (password.length <= 4) {
    return {
      type: 'error',
      message: 'A senha deve conter mais de 4 caracteres',
    };
  }

  if (confirmPassword !== password) {
    return {
      type: 'error',
      message: 'As senhas não coincidem',
    };
  }
};

export const verifyUser = (user) => {
  if (!user) {
    return {
      type: 'error',
      message: 'Você deve fornecer um usuário',
    };
  }
};
