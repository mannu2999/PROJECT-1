import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditboxComponent } from '../editbox/editbox.component';
import { ServiceService } from '../service.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private dialog: MatDialog, private _service: ServiceService) {}
  ngOnInit(): void {
    this.getusers();
  }

  // Assign the data to the data source for the table to render
  displayedColumns: string[] = [
    'Name',
    'Email',
    'Gender',
    'Address',
    'dob',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;

  ngAfterViewInit() {}

  openDialog() {
    this.dialog
      .open(EditboxComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'SAVE') {
          this.getusers();
        }
      });
  }
  getusers() {
    this._service.getusers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<userlist>(res);
      this.dataSource.paginator = this.paginator;
    });
  }
  edit(row: any) {
    this.dialog
      .open(EditboxComponent, {
        width: '40%',
        data: row, // setting the data value from the tr
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'UPDATE') {
          this.getusers();
        }
      });
  }
  delete(id: number) {
    this._service.deleteuser(id).subscribe((res) => {});
    this.getusers();
  }
}
export interface userlist {
  Name: string;
  Email: any;
  Gender: string;
  Address: string;
  dob: string;
}
