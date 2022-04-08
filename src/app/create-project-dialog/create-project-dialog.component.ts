import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subscriber } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectsComponent } from '../projects/projects.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {

  projectDetail !: FormGroup;
  actionBtn: string = "Save"
  paginator: any;
  sort: any;
  dataSource !: MatTableDataSource<ProjectsComponent>;

  constructor(private formbuiler: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.projectDetail = this.formbuiler.group({
      projectName: ["", Validators.required],
      clientName: ["", Validators.required],
      count: ["", Validators.required],
      projectStatus: ["", Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "Update"
      this.projectDetail.controls['projectName'].setValue(this.editData.projectName);
      this.projectDetail.controls['clientName'].setValue(this.editData.clientName);
      this.projectDetail.controls['count'].setValue(this.editData.count);
      this.projectDetail.controls['projectStatus'].setValue(this.editData.projectStatus);
    }
  }
  getAllProjects() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log("error while fetching data");
        }
      })
  }

  addProject() {
    if (!this.editData) {
      console.log("i am new");
      if (this.projectDetail.valid) {
        console.log("hi i am saved")
        this.api.postProduct(this.projectDetail.value)
          .subscribe({
            next: (res) => {
              alert("project Details addeddd succesfully")
              console.log(res)
              this.projectDetail.reset();
              this.dialogRef.close('save');
            },

            error: (err) => {
              console.log(err)
              console.log("error while adding project")
            }

          })

      }
      this.getAllProjects();
      this.reload()
    }
    else {
      console.log("i am updating");
      console.log("hi i am updated");
      console.log(this.editData._id)
      this.api.putProduct(this.projectDetail.value, this.editData._id)
        .subscribe({
          next: (res) => {
            console.log(res)
            console.log("project updated succesfully");
            this.projectDetail.reset();
            this.dialogRef.close("update");
          },
          error: () => {
            console.log("error while updating project")
          }
        })
        this.reload()
    }
    // window.location.reload();
    
  
  }

  reload(): void {
    // window.location.reload()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./'], {
      relativeTo: this.route
    })
  }

}
