import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.css'],
    imports: [CommonModule, RouterOutlet],
    standalone: true
})

export class LayoutOnboardingComponent { }
