import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PostCreationComponent} from './post-creation.component';
import {PostService} from './post.service';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCardModule,
  MatCheckbox,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatRippleModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatRadioModule,
      MatFormFieldModule,
      MatOptionModule,
      MatSelectModule,
      MatIconModule,
      MatInputModule,
      MatCardModule,
      //material
      MatButtonModule,
      MatDialogModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatRippleModule,
      MatTableModule,
      HttpClientModule
    ],
    declarations: [ PostCreationComponent ],
    exports: [
      PostCreationComponent
    ],
    providers: [ PostService],
})
export class PostCreationModule { }
