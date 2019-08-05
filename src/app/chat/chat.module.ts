import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { Routes, RouterModule } from '@angular/router';
import { RemoveSpecialCharPipe } from '../remove-special-char.pipe';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path:'chat', component:ChatBoxComponent }
    ])
  ]
})
export class ChatModule { }
