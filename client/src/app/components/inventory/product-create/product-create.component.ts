import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductSpecification } from 'src/app/core/models/product.model';
import { ProductSpecsService } from 'src/app/core/services/product-specs.service';
import { ProductService } from 'src/app/core/services/product.service';
import { InputDialogComponent } from 'src/app/core/shared/input-dialog/input-dialog.component';

interface ISpecs {
  name: string, count: number, isOpen: boolean
}

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  createProductForm: FormGroup | undefined;
  mainImage: File | undefined;
  images: File[] = [];
  previews: any[] = [];
  unique_specs: ISpecs[] = [];
  id: string | null | undefined;
  customOptions: OwlOptions | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private productService: ProductService,
    private productSpecsService: ProductSpecsService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  get specs(): FormArray {
    return this.createProductForm?.controls?.['specifications'] as FormArray;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('productId');
    if (!this.id) return this.initProductForm();
    this.loadProductAndSpecs();
  }

  loadProductAndSpecs(): void {
    if (!this.id) return;

    this.productService
      .getSingleProduct(this.id)
      .subscribe((productRes) => {
        if (!this.id) return;

        this.productSpecsService
          .getProductSpecs(this.id)
          .subscribe(specsRes => {
            if (!productRes.data) return;
            productRes.data.specifications = specsRes.data ? specsRes.data : [];
            // this.createProductForm ? this.createProductForm.patchValue({ ...productRes.data }) : null;
            this.initProductForm(productRes.data, specsRes.data)
          });
      });
  }

  initProductForm(product?: Product, specs?: ProductSpecification[]): void {
    let specsForms = specs?.map(s => this.newSpecForm(s));
    this.createProductForm = this.fb.group({
      name: new FormControl(product?.name, Validators.required),
      description: new FormControl(product?.description),
      specifications: this.fb.array(specsForms ? specsForms : [])
    });
  }

  newSpecForm(spec?: ProductSpecification): FormGroup | undefined {
    return this.fb.group({
      category: new FormControl(spec?.category, Validators.required),
      name: new FormControl(spec?.name, Validators.required),
      value: new FormControl(spec?.value, Validators.required),
      isImportant: new FormControl(spec?.isImportant)
    });
  }

  onSubmit(): void {
    if (!this.createProductForm) return;
    if (!this.id) {
      this.productService
        .createProduct(this.createProductForm.value)
        .subscribe((res) => {
          if (!res.data) return;
          this.router.navigate([`/product`]);
        });
    } else {
      this.productService
        .editProduct(this.id, this.createProductForm.value)
        .subscribe((res) => {
          res.data ? this.router.navigateByUrl(`/product`) : null;
        });
    }
  }

  onChangeFileInput() {
    this.images = this.images.concat(Array.from(this.fileInput.nativeElement.files));
    if (!this.mainImage && this.images && this.images.length > 0) this.mainImage = this.images[0];
    this.carouselOptions();
    this.setpreviews();
  }

  onClickFileInputButton() {
    if (!this.fileInput) return;
    this.fileInput.nativeElement.click();
  }

  carouselOptions() {
    this.customOptions = {
      loop: true,
      margin: 10,
      autoplay: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      freeDrag: true,
      dotsEach: true,
      dotsData: true,
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 2
        },
        940: {
          items: 3
        }
      }
    };
  }

  setpreviews() {
    let r: any[] = [];
    if (!this.images) {
      this.previews = [];
      return;
    };
    for (let index = 0; index < this.images.length; index++) {
      const element = this.images[index];
      r.push({
        id: index,
        data: URL.createObjectURL(element)
      });
    }
    this.previews = r;
  }

  addSpecification() {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: 'New Category'
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        if (!this.unique_specs.find(s => s.name === result)) {
          let newSpec = {
            name: result,
            count: 0,
            isOpen: false
          };
          this.unique_specs.push(newSpec);
          this.pushNewSpecForm(newSpec);
        } else this.toastr.error('Specification category ' + result + ' already exists.')
      }
    });
  }

  pushNewSpecForm(s: ISpecs, event?: any) {
    if (event) {
      event.stopPropagation();
      s.isOpen = true;
    }
    this.specs.push(this.newSpecForm({
      category: s.name,
      name: '',
      value: '',
      isImportant: false,
      _id: '',
      productId: this.id ? this.id : ''
    }));
    const spec_data = this.unique_specs.find(spec => spec.name === s.name);
    if (!spec_data) {
      this.toastr.error('Spec category was not be added properly');
      return;
    }
    spec_data.count = spec_data.count + 1;
  }
}
