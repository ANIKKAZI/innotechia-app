import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppState } from '../services/app-state';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly state  = inject(AppState);
  private readonly elRef  = inject(ElementRef);

  readonly isGuest    = this.state.isGuest;
  readonly isLoggedIn = this.state.isLoggedIn;
  readonly userName   = this.state.userName;
  readonly userEmail  = this.state.userEmail;
  readonly userAvatar = this.state.userAvatar;
  readonly menuOpen   = signal(false);

  goHome() {
    this.state.selectedService.set(null);
    this.router.navigate(['/dashboard']);
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.menuOpen.set(false);
    }
  }

  logout() {
    const g = (window as any).google;
    g?.accounts?.id?.disableAutoSelect?.();
    this.state.logout();
    this.menuOpen.set(false);
    this.router.navigate(['/login']);
  }
}
