export interface LoginResponsePayload {
  authenticationToken: string;
  expiredAt: Date;
  refreshToken: string;
  username: string;
}
