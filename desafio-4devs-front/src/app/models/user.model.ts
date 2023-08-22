export interface UserModel {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
  }
  
export interface UserList {
    users: UserModel[];
}