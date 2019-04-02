import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {PostCreationComponent} from './post-creation.component';
import {PostCreationService} from './post-creation.service';

@NgModule({
    imports: [
        BrowserAnimationsModule
    ],
    declarations: [ PostCreationComponent ],
    exports: [ PostCreationComponent ],
    providers: [ PostCreationService],
})
export class PostCreationModule { }
