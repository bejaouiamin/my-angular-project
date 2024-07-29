import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Password Validator: Minimum 8 characters
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;  // No error if the value is empty, can handle required in a separate validator
    }
    return value.length >= 8 ? null : { passwordTooShort: true };
  };
}
// repeatPassword Validator: 
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (!password || !repeatPassword) {
    return null;
  }

  return password.value === repeatPassword.value ? null : { passwordMismatch: true };
};

// Date of Birth Validator: User must be over 18 years old
export function dateOfBirthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;  // No error if the value is empty, can handle required in a separate validator
    }
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return { underage: true };
    }
    return age >= 18 ? null : { underage: true };
  };
}
