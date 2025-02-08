
export const isValidNumber = (phone: string): boolean => {
    const numberRegex =  /^(98|97)\d{8}$/;
    return numberRegex.test(phone);
  }