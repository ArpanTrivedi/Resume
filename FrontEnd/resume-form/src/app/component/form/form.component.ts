import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UploadService } from 'src/app/service/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  picture: any;
  uploadPercent: number;

  selectedFile: File = null;
  constructor(
    private service: UploadService,
    private toast: ToastrService,
    private route: Router
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


    this.service.postUserData(fd).subscribe((data: any) => {
      if (data?.message === 'data uploaded')
        this.toast.success('Your data recived');
        this.route.navigateByUrl('people');
    }, (err) => {
      this.toast.error(err.message,"",{
        closeButton:true
      });
    })

  }

  uploadFile(event) {
    this.selectedFile = <File>event.target.files[0];
    //console.log(event.target.files[0]);
  }

  ngOnInit(): void {
  }

}
