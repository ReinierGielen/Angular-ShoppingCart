import {Component, Input, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
	selector: 'app-edit-product',
	templateUrl: './edit-product.component.html',
	styleUrls: [ './edit-product.component.scss' ]
})

export class EditProductComponent implements OnInit {
  @Input() product: Product;
  public Editor = ClassicEditor;
  // product: Product = new Product();
	constructor(private productService: ProductService) {}

	ngOnInit() {}

	editProduct(key:string, productForm: NgForm) {
    const data = productForm.value;

    if (productForm.value['productImageUrl'] === undefined || productForm.value['productImageUrl'] === '') {
      productForm.value['productImageUrl'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
    }

		this.productService.updateProduct(key, data);

		$('#editModal').modal('hide');

		toastr.success('product ' + productForm.value['productName'] + 'is added successfully', 'Product Creation');
	}
}
