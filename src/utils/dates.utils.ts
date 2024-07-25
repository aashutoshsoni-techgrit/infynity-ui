export const getDateInFormat = (dateString: string): string => {
   const date: Date = new Date(dateString);

   const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
   const day = date.getUTCDate().toString().padStart(2, '0');
   const year = date.getUTCFullYear();

   return `${month}/${day}/${year}`;
};

// For user roles list long date format
export const getDateInLongFormat = (dateString: string): string => {
   const date: Date = new Date(dateString);
   const day = date.getDate();
   const formattedDate: string = `${day} ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
   return formattedDate;
};
