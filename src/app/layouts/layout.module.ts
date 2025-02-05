import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutDefaultModule } from './default/default.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutDefaultModule,
        RouterModule.forChild([]),
    ]
})
export class LayoutModule { }
