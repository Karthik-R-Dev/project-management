import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-issue-close',
  templateUrl: './create-issue-close.component.html',
  styleUrls: ['./create-issue-close.component.css']
})
export class CreateIssueCloseComponent implements OnInit {
  issueDetail !: FormGroup;
  dataSource !: MatTableDataSource<unknown>;
  paginator: any;
  sort: any;

  constructor(
    private formbuiler:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editIssue:any,
    private dialogRef:MatDialogRef<CreateIssueCloseComponent>,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllIssues()
    console.log(this.editIssue);
    
    this.issueDetail = this.formbuiler.group({
      issueStatus:["",Validators.required]
    })
    if(this.editIssue){
      this.issueDetail.controls['issueStatus'].setValue(this.editIssue.issueStatus); 
    }
  }
  getAllIssues() {
    this.api.getIssue()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          const a = res.length
          this.editIssue = {...res}
        },
        error: (err) => {
          console.log("error while fetching data");
        }
      })
  }

  updateIssue(){
    console.log("i am updating");
      console.log("hi i am updated");
      console.log(this.editIssue)
    this.api.putIssue(this.issueDetail.value,this.editIssue._id)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.issueDetail.reset();
          this.dialogRef.close('save')
        },
        error:()=>{
          console.log("error while updating");
        }
      })
      this.reload()
  }
  reload(): void {
    // window.location.reload()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./issue'], {
      relativeTo: this.route
    })
  }
}
