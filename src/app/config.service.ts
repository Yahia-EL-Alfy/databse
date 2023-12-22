// src/app/config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env['API_URL'] || 'http://localhost:8080';
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}
