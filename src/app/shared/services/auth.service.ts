import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { lastValueFrom, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AuthState {
  accessToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authStateKey = 'authState';
  private readonly url = 'https://accounts.spotify.com/api/token';

  readonly #httClient = inject(HttpClient);

  private getAuthState(): AuthState | undefined {
    const authState = localStorage.getItem(this.authStateKey);

    return authState ? JSON.parse(authState) : undefined;
  }

  private setAthState(authState: AuthState) {
    localStorage.setItem(this.authStateKey, JSON.stringify(authState));
  }

  private getToken() {
    return this.#httClient
      .post<{ access_token: string; expires_in: number }>(this.url, null, {
        headers: {
          Authorization: `Basic ${btoa(
            `${environment.clientId}:${environment.clientSecret}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'client_credentials',
        },
      })
      .pipe(
        tap(({ access_token, expires_in }) =>
          this.setAthState({
            accessToken: access_token,
            expiresIn: dayjs().add(expires_in, 'second').toISOString(),
          })
        )
      );
  }

  getValidToken(): Promise<string> {
    const authState = this.getAuthState();

    if (
      !authState ||
      (authState.expiresIn && dayjs(authState.expiresIn).isBefore())
    ) {
      const auth$ = this.getToken();

      return lastValueFrom(auth$).then(({ access_token }) => access_token);
    }

    return Promise.resolve(authState.accessToken);
  }
}
