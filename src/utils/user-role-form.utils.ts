export const Required = (value: string | null) => {
   if (!value) {
      return 'Required';
   }
   return undefined; // Return undefined when validation passes
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const userRoleData: any = {
   data: null
};

export const assignroleFormFields = {
   initialValues: {
      userId: '' // Initial value for userId field
   },
   validate: {
      userId: (value: string) => Required(value) // Validate userId using the Required function
   }
};
