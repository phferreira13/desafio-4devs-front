import { environment } from '../../environments/environment';

export const USER_LOGIN_URL = `${environment.api}/auth/login`;
export const USER_GET_ALL_URL = `${environment.api}/user`;
export const ORGANIZATION_GET_ALL_URL = `${environment.api}/organization`;
export const ORGANIZATION_ADD_URL = `${environment.api}/organization`;
export const ORGANIZATION_FILTER_BY_NAME_URL = `${environment.api}/organization/get-by-name`;
export const REVIEW_GET_ALL_URL = `${environment.api}/review`;
export const REVIEW_ADD_URL = `${environment.api}/review`;