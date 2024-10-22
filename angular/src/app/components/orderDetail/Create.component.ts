import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderDetailService } from './OrderDetail.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderDetail-create',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post" (submit)="create()">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="order_detail_order_id">Order Id</label>
                <input id="order_detail_order_id" name="OrderId" class="form-control form-control-sm" [(ngModel)]="orderDetail.OrderId" type="number" required />
                <span *ngIf="errors.OrderId" class="text-danger">{{errors.OrderId}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="order_detail_no">No</label>
                <input id="order_detail_no" name="No" class="form-control form-control-sm" [(ngModel)]="orderDetail.No" type="number" required />
                <span *ngIf="errors.No" class="text-danger">{{errors.No}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="order_detail_product_id">Product</label>
                <select id="order_detail_product_id" name="ProductId" class="form-select form-select-sm" [(ngModel)]="orderDetail.ProductId" required>
                  <option *ngFor="let product of products" value="{{product.Id}}" [selected]="orderDetail.ProductId == product.Id">{{product.Name}}</option>
                </select>
                <span *ngIf="errors.ProductId" class="text-danger">{{errors.ProductId}}</span>
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="order_detail_qty">Qty</label>
                <input id="order_detail_qty" name="Qty" class="form-control form-control-sm" [(ngModel)]="orderDetail.Qty" type="number" required />
                <span *ngIf="errors.Qty" class="text-danger">{{errors.Qty}}</span>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/orderDetail', $event)" routerLink="/orderDetail">Cancel</a>
                <button class="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class OrderDetailCreate {
  
  orderDetail?: any = {}
  products?: any[]
  errors?: any = {}
  constructor(private router: Router, private route: ActivatedRoute, private OrderDetailService: OrderDetailService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderDetailService.create().subscribe(data => {
      this.products = data.products
    }, e => {
      alert(e.error.message)
    })
  }

  create() {
    this.OrderDetailService.create(this.orderDetail).subscribe(() => {
      this.util.goBack('/orderDetail')
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