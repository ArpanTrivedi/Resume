import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UploadService } from 'src/app/service/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  picture: any;
  uploadPercent: number;

  selectedFile: File = null;
  constructor(
    private service: UploadService,
    private toast: ToastrService,
    private route: Router,
    private dataService: DataServiceService
  ) { }

  onSubmit(f: NgForm) {
    //console.log(f.value);

    const {firstname, lastname, email, phonenumber, address} = f.form.value;

    const fd = new FormData();
    console.log(this.selectedFile);
    if(this.selectedFile !== null)
      fd.append('resume', this.selectedFile, this.selectedFile.name);
    fd.append('firstname', firstname);
    fd.append('lastname', lastname);
    fd.append('email', email);
    fd.append('phonenumber', phonenumber);
    fd.append('address', address);

    let id = this.dataService.resumeId;
    this.service.updateUserData(fd, id).subscribe((data: any) => {
      if (data?.message === 'Resume successfully modified')
        this.toast.success('Your data updated');
      this.route.navigateByUrl('people');
    }, (err) => {
      this.toast.error(err.message,"",{
        closeButton:true
      });
    })

  }

  uploadFile(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  ngOnInit(): void {
  }

}
