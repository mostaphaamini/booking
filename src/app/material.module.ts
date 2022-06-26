import { NgModule } from  '@angular/core';
import {MatListModule} from  '@angular/material/list';
import {MatRadioModule} from  '@angular/material/radio';
import {MatInputModule} from  '@angular/material/input';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatCardModule} from  '@angular/material/card';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatCheckboxModule } from  '@angular/material/checkbox';
import {MatButtonModule} from  '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon';
import {MatDatepickerModule} from  '@angular/material/datepicker';
import {MatNativeDateModule} from  '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'  
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MaterialJalaliMomentAdapterModule } from 'material-jalali-moment-adapter';
MaterialJalaliMomentAdapterModule

@NgModule({
imports: [
    MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, 
    MatToolbarModule,FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,
    MatRadioModule, MatTableModule, MatDialogModule, MatSelectModule, MaterialJalaliMomentAdapterModule
],

exports: [
    MatNativeDateModule,FormsModule,MatDatepickerModule,MatIconModule,MatButtonModule,
    MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,
    MatListModule,MatRadioModule, MatTableModule, MatDialogModule, MatSelectModule, MaterialJalaliMomentAdapterModule
],

})

export  class  MyMaterialModule { }