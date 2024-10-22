import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { Util } from '../../util.service'

@Component({
  selector: 'orderHeader-detail',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <form ngNativeValidate method="post">
            <div class="row">
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="order_header_id">Id</label>
                <input readonly id="order_header_id" name="Id" class="form-control form-control-sm" value="{{orderHeader.Id}}" type="number" required />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="customer_name">Customer</label>
                <input readonly id="customer_name" name="customer_name" class="form-control form-control-sm" value="{{orderHeader.CustomerName}}" maxlength="50" />
              </div>
              <div class="mb-3 col-md-6 col-lg-4">
                <label class="form-label" for="order_header_order_date">Order Date</label>
                <input readonly id="order_header_order_date" name="OrderDate" class="form-control form-control-sm" value="{{orderHeader.OrderDate}}" data-type="date" autocomplete="off" required />
              </div>
              <div class="col-12">
                <table class="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let orderHeaderOrderDetail of orderHeaderOrderDetails">
                      <td class="text-center">{{orderHeaderOrderDetail.No}}</td>
                      <td>{{orderHeaderOrderDetail.ProductName}}</td>
                      <td class="text-end">{{orderHeaderOrderDetail.Qty}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/orderHeader', $event)" routerLink="/orderHeader">Back</a>
                <a class="btn btn-sm btn-primary" [queryParams]="{ ref: util.getRef('/orderHeader') }" routerLink="/orderHeader/edit/{{orderHeader.Id}}">Edit</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>`
})
export class OrderHeaderDetail {
  
  orderHeader?: any = {}
  orderHeaderOrderDetails?: any[]
  constructor(private route: ActivatedRoute, private OrderHeaderService: OrderHeaderService, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderHeaderService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.orderHeader = data.orderHeader
      this.orderHeaderOrderDetails = data.orderHeaderOrderDetails
    }, e => {
      alert(e.error.message)
    })
  }
}