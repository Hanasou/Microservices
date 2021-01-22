import { User } from '../models/user';

export interface AuthContext {
    user?: User;
}