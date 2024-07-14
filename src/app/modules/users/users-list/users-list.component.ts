import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersAddComponent } from '../users-add/users-add.component';
import { UsersService } from '../service/users.service';
import { UsersEditComponent } from '../users-edit/users-edit.component';
import { UsersDeleteComponent } from '../users-delete/users-delete.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  USERS:any = [];
  search:string = '';
  rol: string = '';
  isLoading:any;
  constructor(
    public modalService: NgbModal,
    public userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
    this.listUser();
  }

  listUser(){
    this.userService.listUsers(this.search,this.rol).subscribe((resp:any) => {
      console.log(resp);
      this.USERS = resp.users;
    })
  }

  registerUser(){
    const modalRef = this.modalService.open(UsersAddComponent,{centered: true, size: 'md'});

    modalRef.componentInstance.UserC.subscribe((User:any) => {
      console.log(User);
      this.USERS.unshift(User);
    })
  }

  editUser(USER:any){
    const modalRef = this.modalService.open(UsersEditComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.USER = USER;
    modalRef.componentInstance.UserE.subscribe((User:any) => {
      console.log(User);
      let INDEX = this.USERS.findIndex((item:any) => item._id == USER._id);
      if(INDEX != -1){
        this.USERS[INDEX] = User;
      }
    })
  }

  deleteUser(USER:any){
    const modalRef = this.modalService.open(UsersDeleteComponent,{centered: true, size: 'md'});
    modalRef.componentInstance.USER = USER;
    modalRef.componentInstance.UserD.subscribe((val:any) => {
      let INDEX = this.USERS.findIndex((item:any) => item._id == USER._id);
      if(INDEX != -1){
        this.USERS.splice(INDEX,1);
      }
    })
  }
}
