/* tslint:disable */
/* eslint-disable */
export interface RegistrationRequest {
  adress?: string;
  bio?: string;
  dateOfBirth?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  phone?: string;
  picture?: string;
  role?: 'TUTEUR' | 'ETUDIANT';
}
