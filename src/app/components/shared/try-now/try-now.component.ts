import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-try-now',
    templateUrl: './try-now.component.html',
    styleUrls: ['./try-now.component.scss'],
    imports: [RouterLink],
    standalone: true
})
export class TryNowComponent {
}
