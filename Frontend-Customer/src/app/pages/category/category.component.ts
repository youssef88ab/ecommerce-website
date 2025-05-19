import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, SubCategory,  Category} from '../../category.service';

@Component({
  selector: 'app-shop', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  subcategories: any[] = [];
  loading = true;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
      this.categoryService.getSubcategories().subscribe(subs => {
        this.subcategories = subs;
        this.loading = false;
        console.log(subs) ;
      });
    });
  }
  
}