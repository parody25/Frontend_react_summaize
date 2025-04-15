// Utility function to parse "1st March 2025" and convert to "yyyy-mm-dd"
export const parseDate = (dateString: string): string => {
    // Remove ordinal suffix (st, nd, rd, th)
    const cleanedDate = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
    const date = new Date(Date.parse(cleanedDate));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`; // Return in "yyyy-mm-dd" format
  };


  // Utility function to format "yyyy-mm-dd" to "mm/dd/yyyy"
export const formatDateToDDMMYYYY = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };
   
  // Utility function to convert "mm/dd/yyyy" to "yyyy-mm-dd"
  export const convertDDMMYYYYToISO = (dateString: string): string => {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };