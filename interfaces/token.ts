export interface Token {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  rememberMe?: boolean;
}
