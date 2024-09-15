import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products = new Array<any>();
  
  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = new Array<any>();

    this.adminService.getAllProducts().subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.products.push(element);
        });
      }
    });
  }

}
