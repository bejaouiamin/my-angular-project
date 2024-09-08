/* tslint:disable */
/* eslint-disable */
import { Skill } from '../models/skill';
import { User } from '../models/user';
export interface Tuteur {
  educationlevel?: string;
  experience?: string;
  id?: number;
  period?: number | string;
  skills?: Array<Skill>;
  title?: string;
  user?: User;
}
