// sign-in.component.ts

import { Component } from '@angular/core';
import { PatientService } from '../Services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private patientService: PatientService, private router: Router) {}
  email!: string;
  password!: string;

  signinfunc(userData: any) { // Accept form data as an argument
    this.patientService.signinfunc(userData).subscribe({
      next: (res: any) => {
        const token = res.token;
        localStorage.setItem('token', token);

        const isDoctor = res.is_doctor;
        if (isDoctor) {
          this.router.navigate(['/doctor/dr-view-slots']);
        } else {
          this.router.navigate(['/patient/view-appointments']);
        }
      },
      error: (err: any) => {
        console.log(err, 'errors');
        // Handle errors if needed
      },
    });
  }
}
