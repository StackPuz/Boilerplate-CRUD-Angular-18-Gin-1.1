import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserAccountService } from './UserAccount.service'
import { Util } from '../../util.service'

@Component({
  selector: 'userAccount-detail',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_id">Id</label>
                <input readonly id="user_account_id" name="Id" class="form-control form-control-sm" value="{{userAccount.Id}}" type="number" required />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_name">Name</label>
                <input readonly id="user_account_name" name="Name" class="form-control form-control-sm" value="{{userAccount.Name}}" required maxlength="50" />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_email">Email</label>
                <input readonly id="user_account_email" name="Email" class="form-control form-control-sm" value="{{userAccount.Email}}" type="email" required maxlength="50" />
              </div>
              <div class="form-check col-md-6 col-lg-4">
                <input readonly id="user_account_active" name="Active" class="form-check-input" type="checkbox" value="userAccount.Active" [checked]="userAccount.Active" />
                <label class="form-check-label" for="user_account_active">Active</label>
              </div>
              <div class="col-12">
                <h6>Roles</h6>
                <table class="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Role Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let userAccountUserRole of userAccountUserRoles">
                      <td>{{userAccountUserRole.RoleName}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/userAccount', $event)" routerLink="/userAccount">Back</a>
                <a class="btn btn-sm btn-primary" [queryParams]="{ ref: util.getRef('/userAccount') }" routerLink="/userAccount/edit/{{userAccount.Id}}">Edit</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class UserAccountDetail {
  
  userAccount?: any = {}
  userAccountUserRoles?: any[]
  constructor(private route: ActivatedRoute, private UserAccountService: UserAccountService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.UserAccountService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.userAccount = data.userAccount
      this.userAccountUserRoles = data.userAccountUserRoles
    }, e => {
      alert(e.error.message)
    })
  }
}