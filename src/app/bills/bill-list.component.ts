import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBill, Bill } from './bill';
import { BillService } from '../data/bill.service';
import { Totals } from '../shared/totals';
import { MatSort, MatTableDataSource } from '@angular/material';
import * as $ from 'jquery';
// import { BillService } from './bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  pageTitle: string = 'Bills List';
  showVerify: boolean = false;
  errorMessage: string;
  bills: IBill[] = [];
  totals: Totals[] = [];
  model = new Bill();

  //MatTable info
  dataSource;
  displayColumns = [ 'verified', 'date', 'memo', 'location', 'type', 'totalProducts', 'totalPrice'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private billService: BillService) { }

  ngOnInit() {
    this.billService.getBills().subscribe(
      bills => {
        this.bills = bills;
        this.dataSource = new MatTableDataSource(bills);
        this.dataSource.sort = this.sort;
        this.calculateTotalCost();
      },
      error => this.errorMessage = <any>error
    );


    $(document).ready(function(){
      // var div = $(".isVerified");  
      // div.hide( "slow");
    });
  }
      
  showVerifyCheckboxes(){
    this.showVerify = !this.showVerify;
  }

  GetColor(verified: boolean): string{
    if(verified==true) return 'green' 
    else return 'red';
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
  calculateTotalCost() {
    var me = this;
    me.totals = new Array<Totals>();
    me.bills.forEach(function (elem) {
      let index = -1;
      if(me.totals.length != 0)
      {
        index = me.totals.findIndex(e => e.currency === elem.currency);
      }
      
      if(index != -1) {
        me.totals[index].amount = me.totals[index].amount + elem.totalPrice;    
      } else {
        me.totals.push({currency: elem.currency, amount: elem.totalPrice});
      }
    });
  }

  getTotalCost() {
    // console.log("Totals on function call " + JSON.stringify(this.totals));
    return this.totals;
  }
  
  getTotalCount() {
    return this.bills.map(t => t.totalProducts).reduce((acc, value) => acc + value, 0);
  }

  getDisplayedColumns(): string[] {
    if(this.showVerify === true)
    {
      if(this.displayColumns.indexOf('verify-chk') == -1){
        this.displayColumns.unshift('verify-chk');
      } else 
      {
        this.displayColumns.shift();
      }
    } 
    return this.displayColumns;
  }
}
