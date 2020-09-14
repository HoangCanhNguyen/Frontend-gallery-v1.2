import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  verified = true;
  hide = true;
  selectedIndex = 0;

  basicInfo: any;

  constructor(private authService: AuthenticateService, private snackBar: SnackbarNotiService) {}

  ngOnInit(): void {}

  onSubmitBasicInfoForm(form: NgForm): void {
    this.selectedIndex = this.selectedIndex + 1;
    this.verified = !this.verified;
    this.authService.onVendorRegister(form).subscribe(
      (res) => {
        this.snackBar.onSuccess("Đăng ký")
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmitProfessionalInfoForm(form: NgForm): void {
    console.log(form.value);
  }
}
