import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserAccountService } from './UserAccount.service'
import { Util } from '../../util.service'

@Component({
  selector: 'userAccount-edit',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post" (submit)="edit()">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_id">Id</label>
                <input readonly id="user_account_id" name="Id" class="form-control form-control-sm" [(ngModel)]="userAccount.Id" type="number" required />
                <span *ngIf="errors.Id" class="text-danger">{{errors.Id}}</span>
              </div>
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
              <div class="form-check col-md-6 col-lg-4">
                <input id="user_account_active" name="Active" class="form-check-input" type="checkbox" [(ngModel)]="userAccount.Active" [checked]="userAccount.Active" />
                <label class="form-check-label" for="user_account_active">Active</label>
                <span *ngIf="errors.Active" class="text-danger">{{errors.Active}}</span>
              </div>
              <div class="col-12">
                <h6>
                </h6><label class="form-label">Roles</label>
                <div *ngFor="let role of roles" class="form-check">
                  <input id="user_role_role_id{{role.Id}}" name="RoleId" class="form-check-input" type="checkbox" [value]="role.Id" [checked]="userAccountUserRolesChecked('RoleId', role.Id)" />
                  <label class="form-check-label" for="user_role_role_id{{role.Id}}">{{role.Name}}</label>
                </div>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/userAccount', $event)" routerLink="/userAccount">Cancel</a>
                <button class="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class UserAccountEdit {
  
  userAccount?: any = {}
  userAccountUserRoles?: any[]
  roles?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private UserAccountService: UserAccountService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.UserAccountService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.userAccount = data.userAccount
      this.userAccountUserRoles = data.userAccountUserRoles
      this.roles = data.roles
    }, e => {
      alert(e.error.message)
    })
  }

  edit() {
    if (!this.util.validateForm()) {
      return
    }
    this.userAccount.RoleId = Array.from(document.querySelectorAll('[name="RoleId"]:checked')).map((e: any) => e.value)
    this.UserAccountService.edit(this.route.snapshot.params['id'], this.userAccount).subscribe(() => {
      this.util.goBack('/userAccount')
    }, (e) => {
      if (e.error.errors) {
        this.errors = e.error.errors
      }
      else {
        alert(e.error.message)
      } 
    })
  }

  userAccountUserRolesChecked(key: string, value: any) { //https://github.com/angular/angular/issues/14129
    return this.userAccountUserRoles?.some(e => e[key] == value)
  }
}