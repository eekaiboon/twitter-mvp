export interface JwtPayload {
  sub: number; // user id
  email: string;
  username: string;
  iat?: number; // issued at
  exp?: number; // expiration
}