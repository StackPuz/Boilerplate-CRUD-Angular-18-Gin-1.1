import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { Util } from '../util.service'

@Component({
  selector: 'profile',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post" (submit)="edit()">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_name">Name</label>
                <input id="user_account_name" name="Name" class="form-control form-control-sm" [(ngModel)]="userAccount.Name" required maxlength="50" />
                <span *ngIf="errors.Name" class="text-danger">{{errors.Name}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_email">Email</label>
                <input id="user_account_email" name="Email" class="form-control form-control-sm" [(ngModel)]="userAccount.Email" type="email" required maxlength="50" />
                <span *ngIf="errors.Email" class="text-danger">{{errors.Email}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_password">Password</label>
                <input id="user_account_password" name="Password" class="form-control form-control-sm" [(ngModel)]="userAccount.Password" type="password" placeholder="New password" maxlength="100" />
                <span *ngIf="errors.Password" class="text-danger">{{errors.Password}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_password2">Confirm password</label>
                <input data-match="user_account_password" id="user_account_password2" name="Password2" class="form-control form-control-sm" type="password" placeholder="New password" maxlength="100" />
                <span *ngIf="errors.Password" class="text-danger">{{errors.Password}}</span>
              </div>
              <div class="col-12">
                <button class="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class Profile {
  
  userAccount?: any = {}
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.http.get('/profile').subscribe((data: any) => {
      this.userAccount = data.userAccount
    }, e => {
      alert(e.error.message)
    })
  }

  edit() {
    if (!this.util.validateForm()) {
      return
    }
    this.http.post('/updateProfile', this.userAccount).subscribe(() => {
      this.router.navigateByUrl('/home')
    }, (e) => {
      if (e.error.errors) {
        this.errors = e.error.errors
      }
      else {
        alert(e.error.message)
      } 
    })
  }
}