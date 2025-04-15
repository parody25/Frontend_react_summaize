export const formatText = (text: string) => {
    // Remove markdown headers (###, ##, #)
    let formatted = text.replace(/^#+\s*/gm, '');
    // Remove bold markers (**) but keep the text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1');
    // Remove any remaining markdown artifacts
    formatted = formatted.replace(/\\n/g, '\n'); // Convert \n to actual newlines if needed
    formatted = formatted.replace(/^\s+|\s+$/g, ''); // Trim whitespace
    return formatted;
  };