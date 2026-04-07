import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../services/app-state';

// Replace with your Client ID from https://console.cloud.google.com/
const GOOGLE_CLIENT_ID = '138113686411-i56c8el8rtmati1mi4mcr6cct4nmv25h.apps.googleusercontent.com';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly router = inject(Router);
  private readonly state  = inject(AppState);

  ngOnInit() {
    const g = (window as any).google;
    if (!g?.accounts?.id) return;
    g.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: { credential: string }) => {
        this.handleCredential(response.credential);
      },
    });
  }

  continueWithGoogle() {
    const g = (window as any).google;
    if (g?.accounts?.id) {
      g.accounts.id.prompt();
    } else {
      // GSI not loaded (dev fallback – replace CLIENT_ID to enable real auth)
      this.state.loginWithGoogle('user@innotechia.com', 'User', '');
      this.router.navigate(['/dashboard']);
    }
  }

  private handleCredential(credential: string) {
    try {
      const payload = JSON.parse(
        atob(credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      this.state.loginWithGoogle(
        payload.email  ?? '',
        payload.name   ?? '',
        payload.picture ?? '',
      );
    } catch {
      this.state.loginWithGoogle('user@innotechia.com', 'User', '');
    }
    this.router.navigate(['/dashboard']);
  }

  browseAsGuest() {
    this.state.loginAsGuest();
    this.router.navigate(['/dashboard']);
  }
}
