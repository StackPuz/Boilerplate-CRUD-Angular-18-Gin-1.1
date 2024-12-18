import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from './Product.service'
import { Util } from '../../util.service'

@Component({
  selector: 'product-detail',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_id">Id</label>
                <input readonly id="product_id" name="Id" class="form-control form-control-sm" value="{{product.Id}}" type="number" required />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_name">Name</label>
                <input readonly id="product_name" name="Name" class="form-control form-control-sm" value="{{product.Name}}" required maxlength="50" />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="product_price">Price</label>
                <input readonly id="product_price" name="Price" class="form-control form-control-sm" value="{{product.Price}}" type="number" step="0.1" required />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="brand_name">Brand</label>
                <input readonly id="brand_name" name="brand_name" class="form-control form-control-sm" value="{{product.BrandName}}" maxlength="50" />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="user_account_name">Create User</label>
                <input readonly id="user_account_name" name="user_account_name" class="form-control form-control-sm" value="{{product.UserAccountName}}" maxlength="50" />
              </div>
              <div class="mb-3 col-md-6 col-lg-4"><label class="form-label">Image</label>
                <div><a href="http://localhost:8080/uploads/products/{{product.Image}}" target="_blank" title="{{product.Image}}"><img class="img-item" src="http://localhost:8080/uploads/products/{{product.Image}}" /></a></div>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/product', $event)" routerLink="/product">Back</a>
                <a class="btn btn-sm btn-primary" [queryParams]="{ ref: util.getRef('/product') }" routerLink="/product/edit/{{product.Id}}">Edit</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class ProductDetail {
  
  product?: any = {}
  constructor(private route: ActivatedRoute, private ProductService: ProductService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.ProductService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.product = data.product
    }, e => {
      alert(e.error.message)
    })
  }
}