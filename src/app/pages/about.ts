import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../shared/header';

interface TeamMember {
  initials: string;
  name: string;
  degree: string;
  experience: string;
  bio: string;
  skills: string[];
  linkedin: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [Header],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly router = inject(Router);

  readonly team: TeamMember[] = [
    {
      initials: 'SKS',
      name: 'Sajan Kumar Shaw',
      degree: 'B.Tech in Computer Science and Engineering',
      experience: '7+ Years Experience',
      bio: 'A passionate technologist with strong expertise in designing and building scalable enterprise applications, microservices and advanced innovative solutions, high-performance systems serving millions of users, creating impressive, real-world applications. Brings deep full-stack experience across .NET, Angular and IoT technologies, with a focus on clean, maintainable code and mentoring the next generation of developers.',
      skills: ['.NET Core', 'Angular', 'Azure', 'IoT', 'Microservices', 'System Design', 'SQL Server', 'MongoDB', 'Product Strategy'],
      linkedin: 'https://linkedin.com',
    },
    {
      initials: 'BKC',
      name: 'Bujoy Kumar Chatterjee',
      degree: 'B.Tech in Computer Science and Engineering',
      experience: '7+ Years Experience',
      bio: 'A results-driven technology professional with 7+ years of experience delivering robust, production-ready applications across industries. Provides hands-on expertise throughout the software lifecycle—from ideation and planning to development and deployment. Focused on building scalable, maintainable solutions using modern technologies, guided by a client-first mindset and practical, value-driven innovation.',
      skills: ['.NET Core', 'Angular', 'React', 'DevOps', 'NodeJS', 'AWS', 'PostgreSQL', 'Product Strategy'],
      linkedin: 'https://linkedin.com',
    },
  ];

  readonly values: Value[] = [
    {
      icon: 'M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z',
      title: 'Excellence',
      description: 'We pursue excellence in every line of code, every design decision, and every client interaction.',
    },
    {
      icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
      title: 'Integrity',
      description: 'Transparency, honesty, and ethical practices are at the core of everything we do.',
    },
    {
      icon: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative solutions to solve complex challenges.',
    },
    {
      icon: 'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z',
      title: 'Collaboration',
      description: 'We believe in building strong partnerships with our clients, working together as one team.',
    },
    {
      icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
      title: 'Agility',
      description: 'We adapt quickly to changing requirements and deliver solutions with speed and precision.',
    },
    {
      icon: 'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z',
      title: 'Quality',
      description: 'Rigorous testing and quality assurance ensure our deliverables exceed expectations.',
    },
  ];

  goContact() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
