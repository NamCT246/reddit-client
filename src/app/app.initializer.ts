import { AuthService } from '@services/auth/auth.service';

export function AppInitializer(authService: AuthService) {
  return () =>
    new Promise((resolve) => {
      authService.callRefreshToken().subscribe().add(resolve);
    });
}
