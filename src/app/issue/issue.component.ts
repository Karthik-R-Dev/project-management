import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateIssueDialogComponent } from '../create-issue-dialog/create-issue-dialog.component';
import { ApiService } from '../services/api.service';

interface Row {
  issueName: string,
  projectName: string,
  count: number,
  issueStatus: string,
  _id: any,
  isReopened: boolean,
  reopenedCount: number
}

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {


  // resultsLength = 0;

  displayedColumns: string[] = ['issueName', 'projectName', 'count', 'issueStatus', "action"];
  dataSource !: MatTableDataSource<IssueComponent>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  total_issues !: number
  active_issues!: number
  closed_issues!: number
  active_value!: number
  closed_value!: number
  issueDetail: any;
  dialogRef: any;
  reopened_value!: number
  reopened_issues: number = 0

  constructor(public dialog: MatDialog, private api: ApiService, private router: Router, private route: ActivatedRoute, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getAllIssues();
  }

  openDialog() {
    this.dialog.open(CreateIssueDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllIssues();
      }
    })
  }


  getAllIssues() {
    this.api.getIssue()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          const a = res.length
          this.calcIssue(a, res)
        },
        error: (err) => {
          console.log("error whille fetching data");

        }
      })
  }

  editIssue(row: Row) {
    console.log(row);
    this.dialog.open(CreateIssueDialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllIssues();
      }
    })
  }

  editStatus(row: Row) {
    if (row.issueStatus == 'Active') {
      let status = "Closed"
      if(row.isReopened) {
        row.isReopened = false
      }
      console.log(row)
      row.issueStatus = status
    } else {
      let status = "Active"
      if(!row.isReopened) {
        row.isReopened = true
      }
      row.reopenedCount += 1
      console.log(row)
      row.issueStatus = status
    }
    this.api.putIssue(row, row._id)
      .subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err);
        }
      })
    window.location.reload()
  }

  // closeIssue(_id: string) {
  //   console.log(_id);
  //   this.api.deleteIssue(_id).subscribe({
  //     next: () => {
  //       console.log('issue closed');
  //       this.getAllIssues();
  //     },
  //     error: () => {
  //       console.log("error while deleting");
  //     }
  //   })
  //   this.reload()
  // }

  reload(): void {
    // window.location.reload()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./issue'], {
      relativeTo: this.route
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  calcIssue(e: number, res:any) {
    console.log("hi im f", e, res);
    this.total_issues = e;
    this.active_issues = 0;
    this.closed_issues = 0;
    for (let i = 0; i < res.length; i++) {
      if (res[i].issueStatus === "Active") {
        this.active_issues = this.active_issues + 1;
      }
      if(res[i].isReopened === true) 
      this.reopened_issues += 1
    }
    this.closedIssue();
    this.active_value = (this.active_issues / this.total_issues) * 100;
    this.closed_value = (this.closed_issues / this.total_issues) * 100;
    this.reopened_value = (this.reopened_issues / this.total_issues) * 100
  }

  closedIssue() {
    this.closed_issues = this.total_issues - this.active_issues
  }

  openSnack(){
    this.snackbar.open(`Issue edited`,`OK`,{
      duration:2000
    })
  }



}
