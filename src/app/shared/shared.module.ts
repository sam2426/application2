import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalComponent } from './experimental/experimental.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { ExponentialPipe } from '../exponential.pipe';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FirstCharComponent } from './first-char/first-char.component';




@NgModule({
  declarations: [ExperimentalComponent,ExponentialPipe, UserDetailsComponent, FirstCharComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'expr', component:ExperimentalComponent}
    ])
  ],
  exports:[CommonModule,
    FormsModule,
    FirstCharComponent,
    UserDetailsComponent]
})
export class SharedModule { }
