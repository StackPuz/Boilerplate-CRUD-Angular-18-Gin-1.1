import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BrandService } from './Brand.service'
import { Util } from '../../util.service'

@Component({
  selector: 'brand-edit',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post" (submit)="edit()">
            <div class="row">
              <input type="hidden" id="brand_id" name="Id" [(ngModel)]="brand.Id" />
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="brand_name">Name</label>
                <input id="brand_name" name="Name" class="form-control form-control-sm" [(ngModel)]="brand.Name" required maxlength="50" />
                <span *ngIf="errors.Name" class="text-danger">{{errors.Name}}</span>
              </div>
              <div class="col-12">
                <h6>Brand's products</h6>
                <table class="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let brandProduct of brandProducts">
                      <td>{{brandProduct.Name}}</td>
                      <td class="text-end">{{brandProduct.Price}}</td>
                      <td class="text-center">
                        <a class="btn btn-sm btn-secondary" routerLink="/product/{{brandProduct.Id}}" title="View"><i class="fa fa-eye"></i></a>
                        <a class="btn btn-sm btn-primary" routerLink="/product/edit/{{brandProduct.Id}}" title="Edit"><i class="fa fa-pencil"></i></a>
                        <a class="btn btn-sm btn-danger" routerLink="/product/delete/{{brandProduct.Id}}" title="Delete"><i class="fa fa-times"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a class="btn btn-sm btn-primary" (click)="util.goto($event)" href="/product/create?product_brand_id={{brand.Id}}">Add</a>
                <hr />
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/brand', $event)" routerLink="/brand">Cancel</a>
                <button class="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class BrandEdit {
  
  brand?: any = {}
  brandProducts?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private BrandService: BrandService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.BrandService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.brand = data.brand
      this.brandProducts = data.brandProducts
    }, e => {
      alert(e.error.message)
    })
  }

  edit() {
    this.BrandService.edit(this.route.snapshot.params['id'], this.brand).subscribe(() => {
      this.util.goBack('/brand')
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