import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  protected readonly categories = [
    'Portátiles',
    'Periféricos',
    'Monitores',
    'Audio',
    'Accesorios',
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    imageUrl: ['', Validators.required],
    inStock: [true],
  });

  protected onSubmit(): void {
    // Si es inválido, marcamos todo como tocado para que salgan los errores
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productService.addProduct(this.form.getRawValue());

    this.form.reset({
      name: '',
      price: 0,
      category: '',
      imageUrl: '',
      inStock: true,
    });

    this.router.navigate(['/productos']);
  }
}
