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
  selector: 'app-find-the-person',
  templateUrl: './find-the-person.component.html',
  styleUrls: ['./find-the-person.component.css']
})
export class FindThePersonComponent implements OnInit {

  array = [];
  name: string = '';
  
  submit() {
    this.service.getUserData().subscribe((data: any) => {
      console.log(data.data);
      this.array = data?.data;
      console.log(this.array);
    }, (err) => {
      this.toast.error(err.message,"",{
        closeButton:true
      });
    });
  }

  faEnvelopeOpen = faEnvelopeOpen;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;

  constructor(
    private service: UploadService,
    private toast: ToastrService,
    private route: Router,
    private dataService: DataServiceService
    ) { }

  ngOnInit(): void {
  }

  onClick(data) {
    console.log(data);
    this.service.deleteUserData(data).subscribe((result) => {
      this.toast.success('success user data deleted');
      this.submit();
    }, (err) => {
      this.toast.error(`Please enter the full name` + err.message);
    });

  }

  onClickUpdate(data) {
    this.dataService.resumeId = data;
    this.route.navigateByUrl('update');
  }

}
