import { passwordRules } from "@/lib/constants";

export const validatePassword = (password: string) => {
    return passwordRules.every(rule => rule.test(password));
  };
  
  export const getPasswordChecks = (password: string) => {
    return passwordRules.map(rule => ({
      label: rule.label,
      valid: rule.test(password)
    }));
  };