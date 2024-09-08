/* tslint:disable */
/* eslint-disable */
import { Subject } from '../models/subject';
import { Tuteur } from './tuteur';
export interface User {
  tuteur?: Tuteur; 
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  adress?: string;
  bio?: string;
  createdDate?: string;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  id?: number;
  lastModifiedDate?: string;
  lastName?: string;
  name?: string;
  password?: string;
  phone?: string;
  picture?: string;
  resetToken?: string;
  role?: 'TUTEUR' | 'ETUDIANT';
  subjects?: Array<Subject>;
  username?: string;
}
