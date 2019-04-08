import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PostCreationComponent} from './post-creation.component';
import {PostCreationService} from './post-creation.service';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCheckbox,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

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
      MatInputModule
    ],
    declarations: [ PostCreationComponent ],
    exports: [
      PostCreationComponent
    ],
    providers: [ PostCreationService],
})
export class PostCreationModule { }
