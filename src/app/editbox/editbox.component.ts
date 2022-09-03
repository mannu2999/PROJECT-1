import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ServiceService } from '../service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-editbox',
  templateUrl: './editbox.component.html',
  styleUrls: ['./editbox.component.scss'],
})
export class EditboxComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private _service: ServiceService,
    private dialogref: MatDialogRef<EditboxComponent>,
    @Inject(MAT_DIALOG_DATA) public userdata: any //getting the data from userpage
  ) {}
  gender = ['male', 'female'];
  userform!: FormGroup;
  edit: string = 'SAVE';
  ngOnInit(): void {
    this.userform = this.formbuilder.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Gender: ['', Validators.required],
      Address: ['', Validators.required],
      dob: ['', Validators.required],
      // 'Id',
      // 'Name',
      // 'Email',
      // 'Gender',
      // 'Address',
      // 'dob',
      // 'action',
    });
    console.log(this.userdata);
    if (this.userdata) {
      this.edit = 'UPDATE';
      this.userform.setValue({
        Name: this.userdata.Name,
        Email: this.userdata.Email,
        Gender: this.userdata.Gender,
        Address: this.userdata.Address,
        dob: this.userdata.dob,
      });
    }
  }
  addusers() {
    if (!this.userdata) {
      if (this.userform.valid) {
        this._service.postusers(this.userform.value).subscribe({
          next: (res) => {
            alert('new user');
            console.log(res);
            this.userform.reset();
            this.dialogref.close('SAVE');
            this._service.getusers().subscribe((res) => {});
          },
          error: () => {
            alert('error');
          },
        });
      }
    } else {
      this.updateuser(this.userform.value, this.userdata.id);
      console.log(this.userdata.id);
    }
  }
  updateuser(data: any, id: number) {
    this._service.updateuser(data, id).subscribe((res: any) => {
      console.log(res);
      alert('updated successfully');
      this.userform.reset();
      this.dialogref.close('UPDATE');
    });
  }
}
