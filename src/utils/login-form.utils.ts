export type LoginFormType = { email: string; password: string };

export type CreateNewPasswordFormType = { password: string; confirmPassword: string };

export type ResetPasswordType = CreateNewPasswordFormType;

export const loginFormFields = {
   initialValues: {
      email: '',
      password: ''
   },
   validate: {
      email: (value: string) => {
         if (!value) {
            return 'Required';
         }
         if (!/^\S+@\S+$/.test(value)) {
            return 'Invalid email';
         }

         if (loginFormData.isInCorrectCredentials) {
            return ' ';
         }

         if (loginFormData.inCorrectEmail) {
            return 'Given email is not registered';
         }
      },
      password: (value: string) => {
         if (!value) {
            return 'Required';
         }
         if (loginFormData.isInCorrectCredentials) {
            return ' ';
         }
      }
   }
};

export const loginFormData = {
   password: '',
   isInCorrectCredentials: false,
   inCorrectEmail: false
};

export const passwordSetupFields = {
   initialValues: {
      password: '',
      confirmPassword: ''
   },
   validate: {
      password: (value: string) => {
         if (!value) {
            return 'Required';
         }
         return isValidPassword(value);
      },
      confirmPassword: (value: string) => {
         if (!value) {
            return 'Required';
         }
         if (loginFormData.password !== value) {
            return 'Confirm password is not matching';
         }
      }
   }
};

export const isValidPassword = (password: string): string | null => {
   if (password.length < 8) {
      return 'Password should have 8 characters';
   }

   if (password.length > 20) {
      return 'Password should not exceed 20 characters';
   }
   const validators = {
      hasCapitalAlpha: false,
      hasSmallAlpha: false,
      hasDigit: false,
      hasSpecialChar: false
   };

   for (let i = 0; i < password.length; i++) {
      if (password[i] >= 'A' && password[i] <= 'Z') {
         validators.hasCapitalAlpha = true;
      } else if (password[i] >= 'a' && password[i] <= 'z') {
         validators.hasSmallAlpha = true;
      } else if (password[i] >= '0' && password[i] <= '9') {
         validators.hasDigit = true;
      } else if (password[i] === ' ') {
         return 'Password should not have space';
      } else {
         validators.hasSpecialChar = true;
      }
   }

   if (!validators.hasCapitalAlpha) {
      return 'Password should have one capital letter';
   }
   if (!validators.hasSmallAlpha) {
      return 'Password should have one small letter';
   }
   if (!validators.hasDigit) {
      return 'Password should have one digit';
   }
   if (!validators.hasSpecialChar) {
      return 'Password should have one special character';
   }

   return null;
};
