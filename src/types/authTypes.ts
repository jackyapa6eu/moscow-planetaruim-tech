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
  first_name: string | undefined;
  last_name: string | null;
  profile_picture: string | undefined;
  position: string | undefined,
  phone_number: string | undefined,
  tg_username: string | undefined
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
