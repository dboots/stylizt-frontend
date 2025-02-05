import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/shared/footer/footer.component';
import { NavComponent } from 'src/app/components/shared/nav/nav.component';

@Component({
    selector: 'app-layout-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.css'],
    imports: [NavComponent, RouterOutlet, FooterComponent],
    standalone: true
})

export class LayoutDefaultComponent { }
