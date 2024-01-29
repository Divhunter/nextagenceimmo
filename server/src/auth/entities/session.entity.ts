export interface SessionModel {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  loginIp?: string | null;
  deviceInfo?: string | null;
  isLoggedIn?: boolean | null;
}
