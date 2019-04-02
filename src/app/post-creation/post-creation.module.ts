import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PostCreationComponent} from './post-creation.component';
import {PostCreationService} from './post-creation.service';
import {FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule
    ],
    declarations: [ PostCreationComponent ],
    exports: [
      PostCreationComponent
    ],
    providers: [ PostCreationService],
})
export class PostCreationModule { }
