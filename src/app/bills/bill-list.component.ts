import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBill } from './bill';
import { BillService } from '../data/bill.service';
// import { BillService } from './bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  pageTitle: string = 'Bills List';
  bills: IBill[] = [];
  errorMessage: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private billService: BillService) { }

  ngOnInit() {
    this.billService.getBills().subscribe(
      bills => {
        this.bills = bills;
      },
      error => this.errorMessage = <any>error
    );
  }

}
