export interface authState {
  status: authStatus;
  user: user;
  modal: authModal;
}

export interface authModal {
  isOpen: boolean;
  variant: 'login' | 'register';
}

export interface authStatus {
  isLogged: boolean;
  loading: boolean;
  error: string | null;
}

export interface user {
  id: string | null;
  email: string | null;
  firstName: string | undefined;
  lastName: string | null;
  profile_picture: string | undefined;
}

export interface LoginFormFields {
  email: string;
  pass: string;
}

export interface RegFormFields {
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  repeatPass: string;
}
