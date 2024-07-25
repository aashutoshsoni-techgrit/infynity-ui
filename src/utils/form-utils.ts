import parsePhoneNumberFromString, { AsYouType, parsePhoneNumber } from 'libphonenumber-js';

export const ValidatePhoneNumber = (value: string): string | null => {
   if (value) {
      try {
         const formattedPhoneNumber = value.replaceAll('+', '');

         if (!formattedPhoneNumber) {
            return null;
         }

         const fullNumber = `+${formattedPhoneNumber}`;
         const isValid: boolean = parsePhoneNumber(fullNumber)?.isPossible();

         if (!isValid) {
            return 'Invalid phone number';
         }
      } catch (error) {
         return 'Invalid phone number';
      }
   }
   return null;
};

export const formatPhoneNumber = (phone: string, code: string): string | null => {
   if (phone && code) {
      const cleanPhone = phone.replace(/\D/g, '');
      const cleanCountryCode = code.replace(/\D/g, '');
      const fullPhoneNumber = `${cleanCountryCode}${cleanPhone}`;
      try {
         const parsedPhoneNumber = parsePhoneNumberFromString(`+${fullPhoneNumber}`);
         if (parsedPhoneNumber) {
            if (parsedPhoneNumber.country) {
               const countryCode = parsedPhoneNumber.country;
               const nationalNumber = parsedPhoneNumber.nationalNumber;
               return new AsYouType(countryCode).input(nationalNumber);
            } else {
               return parsedPhoneNumber.formatNational();
            }
         } else {
            return null;
         }
      } catch (error) {
         return null;
      }
   }
   return null;
};
