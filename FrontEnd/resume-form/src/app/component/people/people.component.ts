import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/service/upload.service';
import { ToastrService } from 'ngx-toastr';
import {
  faPhone,
  faMapMarkedAlt,
  faEnvelopeOpen
 } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  array = [];


  faEnvelopeOpen = faEnvelopeOpen;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;

  constructor(
    private service: UploadService,
    private toast: ToastrService,
    private route: Router,
    private dataService: DataServiceService
    ) { }

  seeUser() {
    this.service.getUserData().subscribe((data: any) => {
      this.array = data?.data;
      console.log(this.array);
    }, (err) => {
      this.toast.error(err.message,"",{
        closeButton:true
      });
    });
  }

  ngOnInit(): void {

    this.seeUser();

  }

  onClick(data) {
    console.log(data);
    this.service.deleteUserData(data).subscribe((result) => {
      this.toast.success('success user data deleted');
      this.seeUser();
    }, (err) => {
      this.toast.error(err.message,"",{
        closeButton:true
      });
    });

  }

  onClickUpdate(data) {
    this.dataService.resumeId = data;
    this.route.navigateByUrl('update');
  }

}
