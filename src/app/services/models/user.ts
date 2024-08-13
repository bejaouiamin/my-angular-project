/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Subject } from '../models/subject';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  adress?: string;
  authorities?: Array<GrantedAuthority>;
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
  role?: 'TUTEUR' | 'ETUDIANT';
  subjects?: Array<Subject>;
  username?: string;
}
