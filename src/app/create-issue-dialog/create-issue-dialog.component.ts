import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsComponent } from '../projects/projects.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-issue-dialog',
  templateUrl: './create-issue-dialog.component.html',
  styleUrls: ['./create-issue-dialog.component.css']
})
export class CreateIssueDialogComponent implements OnInit {

  issueDetail !: FormGroup;
  actionBtn: string = "Save"
  paginator: any;
  sort: any;
  dataSource !: MatTableDataSource<ProjectsComponent>;
  total_issues: any;
  active_issues: any;
  closed_issues: any;
  active_value: any;
  closed_value: any;
  

  constructor(private formbuiler:FormBuilder,
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editIssue:any,
    private dialogRef:MatDialogRef<CreateIssueDialogComponent>,
    private router:Router,
    private route:ActivatedRoute,
    private snackbar:MatSnackBar) { }



  ngOnInit(): void {
    this.issueDetail = this.formbuiler.group({
      issueName:["",Validators.required],
      projectName:["",Validators.required],
      count:["",Validators.required]
    })
    console.log(this.editIssue)
    if(this.editIssue){
      console.log(111);
      
      this.actionBtn = "Update"
      this.issueDetail.controls['issueName'].setValue(this.editIssue.issueName);
      this.issueDetail.controls['projectName'].setValue(this.editIssue.projectName);
      this.issueDetail.controls['count'].setValue(this.editIssue.count);
      this.issueDetail.controls['issueStatus'].setValue(this.editIssue.projectStatus); 
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
          this.calcIssue(a,res)

        },
        error: (err) => {
          console.log("error while fetching data");
        }
      })
  }

  addIssue(){
    if(!this.editIssue){
      console.log(this.editIssue);
      if(this.issueDetail.valid){
        console.log("hi i am saved")
        this.api.postIssue(this.issueDetail.value)
        .subscribe({
          next:(res)=>{
            console.log("issue added succefully");
            console.log(res)
            this.issueDetail.reset();
            this.dialogRef.close('save')
          },
          error:(err)=>{
            console.log(err);
            console.log("error while adding issue ");
          }
        })
        this.openSnack()
      }
      this.getAllIssues();
      this.reload()
    }
    else{
      console.log("i am updating");
      console.log("hi i am updated");
      console.log(this.editIssue._id)
      this.api.putIssue(this.issueDetail.value,this.editIssue._id)
      .subscribe({
        next:(res)=>{
          console.log(res)
          this.issueDetail.reset();
          this.dialogRef.close('update')
        },
        error:(err)=>{
        }
      })
    }
   this.reload()
  }

  reload(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./issue'], {
      relativeTo: this.route
    })
  }

  calcIssue(e:any,res:any){
    console.log("hi im f",e,res);
 this.total_issues = e;
  this.active_issues = 0;               
  this.closed_issues =0;
  for(let i=0;i<res.length;i++){
    if(res[i].issueStatus==="Active"){
      this.active_issues=this.active_issues+1;
    }
  }
  this.closedIssue();
 this.active_value =(this.active_issues / this.total_issues)*100;
 this.closed_value =(this.closed_issues / this.total_issues)*100;
  }

  closedIssue(){
    this.closed_issues=this.total_issues-this.active_issues
  }
  openSnack(){
    this.snackbar.open(`Issue created`,`OK`,{
      duration:2000
    })
  }



}
