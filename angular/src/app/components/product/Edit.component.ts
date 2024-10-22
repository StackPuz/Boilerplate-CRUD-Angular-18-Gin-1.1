import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from './Product.service'
import { Util } from '../../util.service'

@Component({
  selector: 'product-edit',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post" (submit)="edit()" enctype="multipart/form-data">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_id">Id</label>
                <input readonly id="product_id" name="Id" class="form-control form-control-sm" [(ngModel)]="product.Id" type="number" required />
                <span *ngIf="errors.Id" class="text-danger">{{errors.Id}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_name">Name</label>
                <input id="product_name" name="Name" class="form-control form-control-sm" [(ngModel)]="product.Name" required maxlength="50" />
                <span *ngIf="errors.Name" class="text-danger">{{errors.Name}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_price">Price</label>
                <input id="product_price" name="Price" class="form-control form-control-sm" [(ngModel)]="product.Price" type="number" step="0.1" required />
                <span *ngIf="errors.Price" class="text-danger">{{errors.Price}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_brand_id">Brand</label>
                <select id="product_brand_id" name="BrandId" class="form-select form-select-sm" [(ngModel)]="product.BrandId" required>
                  <option *ngFor="let brand of brands" value="{{brand.Id}}" [selected]="product.BrandId == brand.Id">{{brand.Name}}</option>
                </select>
                <span *ngIf="errors.BrandId" class="text-danger">{{errors.BrandId}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_image">Image</label>
                <input type="file" accept="image/*" id="product_image" name="ImageFile" class="form-control form-control-sm" maxlength="50" />
                <a href="http://localhost:8080/uploads/products/{{product.Image}}" target="_blank" title="{{product.Image}}"><img class="img-item" src="http://localhost:8080/uploads/products/{{product.Image}}" /></a>
                <span *ngIf="errors.Image" class="text-danger">{{errors.Image}}</span>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/product', $event)" routerLink="/product">Cancel</a>
                <button class="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class ProductEdit {
  
  product?: any = {}
  brands?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private ProductService: ProductService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.ProductService.edit(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data.product
      this.brands = data.brands
    }, e => {
      alert(e.error.message)
    })
  }

  edit() {
    let data = { ...this.product }
    data.ImageFile = (document.getElementsByName('ImageFile')[0] as any).files[0]
    data = this.util.getFormData(data)
    this.ProductService.edit(this.route.snapshot.params['id'], data).subscribe(() => {
      this.util.goBack('/product')
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