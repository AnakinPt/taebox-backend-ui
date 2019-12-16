import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {ToastModule} from 'primeng/toast';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api/public_api';

@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService, MessageService
  ],
})
export class UsersModule { }
