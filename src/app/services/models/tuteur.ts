/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Tuteur {
  educationlevel?: string;
  experience?: string;
  id?: number;
  period?: number | string;
  skills?: string;
  title?: string;
  user?: User;
}
