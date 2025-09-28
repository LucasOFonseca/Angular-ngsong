import { Injectable } from '@angular/core';

interface AuthState {
  accessToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authStateKey = 'authState';

  constructor() {}
}
