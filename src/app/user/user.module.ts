import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './main/main.component';
import { ConverterComponent } from './converter/converter.component';
import { BionicFilesComponent } from './bionic-files/bionic-files.component';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CompleteDialogComponent } from './complete-dialog/complete-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    MainComponent,
    ConverterComponent,
    BionicFilesComponent,
    HeaderComponent,
    CompleteDialogComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
  ]
})
export class UserModule { }
