import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';
import { SnackbarNotiService } from 'src/app/shared/service/snackbar-noti.service';
import { VendorService } from 'src/app/shared/service/vendor.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  verified: boolean = true;
  hide: boolean = true;
  selectedIndex: number = 0;
  vendor_email: string;

  professional_form: ProfessionalForm;

  constructor(
    private authService: AuthenticateService,
    private snackBar: SnackbarNotiService,
    private _vendorService: VendorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitBasicInfoForm(form: NgForm): void {
    this.vendor_email = form.value.email;
    this.authService.onVendorRegister(form).subscribe(
      (res) => {
        this.selectedIndex = this.selectedIndex + 1;
        this.verified = !this.verified;
        this.snackBar.onSuccess('Đăng ký');
      },
      (err) => {
        this.snackBar.onServerError(err);
      }
    );
  }

  onSubmitProfessionalInfoForm(form: NgForm): void {
    const data = form.value;
    this.professional_form = {
      email: this.vendor_email,
      fullname: data.fullname,
      artForm: data.artForm,
      category: data.category,
      facebookLink: data.facebookLink,
      selfIntroduction: data.selfIntroduction,
    };
    this._vendorService
      .onSubmitInformation(this.professional_form)
      .subscribe((res) => {
        this.snackBar.onSuccess("Nộp đơn")
        this.router.navigate(['/home'])
      });
  }
}

interface ProfessionalForm {
  email?: string;
  fullname?: string;
  artForm?: string;
  category?: string;
  facebookLink?: string;
  selfIntroduction?: string;
}
