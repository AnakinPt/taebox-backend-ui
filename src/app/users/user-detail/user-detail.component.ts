import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;

  readonly emptyUser: User = {
    id: 0,
    name: '',
    address: {
      id: 0,
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      postalCode: '',
      postalCodeCity: '',
      country: 'PT'
    }
  };

  userFormControl: FormGroup;

  addMode = false;

  constructor(readonly route: ActivatedRoute,
    readonly usersService: UsersService,
    private messageService: MessageService,
    readonly formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.route.snapshot.params['id'] === 'new') {
      this.user = this.emptyUser;
      this.addMode = true;
    } else {
      this.usersService.user(this.route.snapshot.params['id'])
        .subscribe(
          (u) => {
            this.user = u;
          },
          (err) => {
            this.handleError(err);
            this.user = this.emptyUser;
          });
    }
    this.userFormControl = this.formBuilder.group({
      name: this.formBuilder.control(this.user.name),
      addressLine1: this.formBuilder.control(this.user.address.addressLine1),
      addressLine2: this.formBuilder.control(this.user.address.addressLine2),
      postalCode: this.formBuilder.control(this.user.address.postalCode),
      postalCodeCity: this.formBuilder.control(this.user.address.postalCodeCity)
    });
  }

  isEditable(): boolean {
    return false;
  }

  getControl(field: string) {
    return this.userFormControl.get(field);
  }

  updateMember(field: string) {
    const control = this.getControl(field);
    if (control.valid) {
      this.user[field] = control.value;
      return this.usersService.updateUser(this.user).subscribe(
        (u) => {
          this.handleUpdate(field);
          this.user = u;
        },
        (err) => { this.handleError(err); });
    }
  }

  updateAddress(field: string) {
    const control = this.getControl(field);
    if (control.valid) {
      this.user.address[field] = control.value;
      this.usersService.updateAddress(this.user.address).subscribe(
        (a) => {
          this.handleUpdate(field);
          this.user.address = a;
        },
        (err) => { this.handleError(err); });
    }
  }

  addMember() {
    if (this.userFormControl.valid) {
      const user = this.mapControl2User(this.userFormControl);
      this.usersService.addUser(user).subscribe(
        (u) => { this.handleUserAdded(u); },
        (err) => { this.handleError(err); });
      this.user = this.emptyUser;
    }
  }

  private mapControl2User(control: FormGroup): User {
    return {
      id: 0,
      name: control.value['name'],
      address: {
        id: 0,
        addressLine1: control.value['addressLine1'],
        addressLine2: control.value['addressLine2'],
        addressLine3: control.value['addressLine3'],
        postalCode: control.value['postalCode'],
        postalCodeCity: control.value['postalCodeCity'],
        country: 'PT'
      }
    };
  }

  private handleUserAdded(user: User) {
    this.messageService.add({ severity: 'success', summary: 'Customer added', detail: `Customer was added with id ${user.id}` });
  }

  private handleError(error: any) {
    let errorMessage = 'Some errors occorred: ';
    for (const err of error.error.errors) {
      errorMessage += `${err.defaultMessage};`;
    }
    this.messageService.add({ severity: 'error', summary: 'Error', detail: '`${errorMessage}' });
  }

  handleUpdate(field: string) {
    this.messageService.add({ severity: 'success', summary: 'Customer updated', detail: 'Customer was updated with id ${user.id}' });
  }

}
