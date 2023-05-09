export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
  };
  access_token: string;
}

export interface LoginData {
  email: string;
  password: string;
}
