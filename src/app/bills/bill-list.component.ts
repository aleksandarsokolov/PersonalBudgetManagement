import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBill, Bill } from './bill';
import { BillService } from '../data/bill.service';
import { Totals } from '../shared/totals';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatSnackBar, MatSnackBarRef } from '@angular/material';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { BillService } from './bill.service';



@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  pageTitle: string = 'Bills List';
  showVerify: boolean = false;
  showAddNew: boolean = true;
  errorMessage: string;
  bills: IBill[] = [];
  totals: Totals[] = [];
  totalCount: number = 0;
  model = new Bill();

  // auto complete option
  billFormGroup: FormGroup;

  optionsCompanies: string[] = [];
  filteredCompanies: Observable<string[]>;

  //MatTable info
  dataSource;
  //selection;
  selection = new SelectionModel<IBill>(true, []);
  displayColumns = [ 'verified', 'date', 'memo', 'company', 'location', 'type', 'totalProducts', 'totalPrice', 'openBill', 'editBill'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private billService: BillService,
    private _formBuilder: FormBuilder,
    public snackBar: MatSnackBar) {

    this.billFormGroup = this._formBuilder.group({
      company: new FormControl()
    });
  }

  ngOnInit() {
    this.billService.getBills().subscribe(
      bills => {
        this.bills = bills;
        this.bills.forEach(function (bill) {
          bill.date = new Date(bill.date);
          return bill;   
        });
        
        this.dataSource = new MatTableDataSource<IBill>(this.bills);
        //this.selection = new SelectionModel<IBill>(true, bills.filter(bill => bill.verified === true));
        this.optionsCompanies = bills.map(bill => bill.company);
        this.dataSource.sort = this.sort;
        this.getTotalCost();
        this.getTotalCount();
        console.log();
      },
      error => this.errorMessage = <any>error
    );

    //Companies Autocomplete
    this.filteredCompanies = this.billFormGroup.controls.company.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))

      );

    $(document).ready(function(){
      // Document ready jquery script
      $(".open-products").click(function(this){
        window.open("bills/" + this.id, "_self");
      });
    });
  }

  //Companies Autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsCompanies.filter(option => option.toLowerCase().includes(filterValue));
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
    this.getTotalCost();
    this.getTotalCount();
    //console.log("Filtered List: " + JSON.stringify(this.dataSource);
  }
  
  
  getTotalCost() {
    var me = this;
    me.totals = new Array<Totals>();
    if(me.dataSource !=undefined) {
      me.dataSource.filteredData.forEach(function (elem) {
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
  }
  
  getTotalCount() {
    if(this.dataSource.filteredData !=undefined) {
      this.totalCount = this.dataSource.filteredData.map(t => t.totalProducts).reduce((acc, value) => acc + value, 0);
    } else {
      this.totalCount = this.bills.map(t => t.totalProducts).reduce((acc, value) => acc + value, 0);
    }
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


  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  editBill(id){
    var bill = this.dataSource.data.filter(bill => bill.billId == id)[0];
    this.model = bill;
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 3000,
    });
    
    snackBarRef.onAction().subscribe(() => {
      this.model = new Bill();
    });
  }

  saveModel() {
    if (this.model.billId !=0 ){
      var index = this.dataSource.data.findIndex(element => element.billId == this.model.billId);
    }
    else
    {
      this.bills.push(this.model);
      this.dataSource = new MatTableDataSource<IBill>(this.bills);
      this.model = new Bill();
    }
  }
}
