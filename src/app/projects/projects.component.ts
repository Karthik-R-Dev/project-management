import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
// import { CreateIssueCloseComponent } from '../create-issue-close/create-issue-close.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
// import { DeleteProjectDialogComponent } from '../delete-project-dialog/delete-project-dialog.component';
// import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';
import { ApiService } from '../services/api.service';




@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


  displayedColumns: string[] = ['projectName', 'clientName', 'count', 'projectStatus', 'action'];
  dataSource !: MatTableDataSource<ProjectsComponent>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  active_projects: any;
  closed_projects: any;
  total_projects: any;
  active_value: any;
  closed_value: any;
  res: any;

  constructor(public dialog: MatDialog, private api: ApiService, private router: Router, private route: ActivatedRoute) { }




  ngOnInit(): void {
    this.getAllProjects();

  }


  openDialog() {
    this.dialog.open(CreateProjectDialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllProjects();
      }
    });
  }

  getAllProjects() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          const a = res.length
          this.calcProject(a, res)
          console.log("hi im from project", a, res)
        },
        error: (err) => {
          console.log("error while fetching data");
        }
      })


  }

  editProject(row: any) {
    console.log(row)
    this.dialog.open(CreateProjectDialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllProjects();
        this.ngOnInit();
      }
    })

  }
  deleteProject(_id: string) {
    console.log(_id)
    this.api.deleteProduct(_id)
      .subscribe({
        next: () => {
          console.log("project deleted");
          this.ngOnInit();
          this.getAllProjects();

        },
        error: () => {
          console.log("error while deleting")
        }
      })
    this.reload()
  }


  reload(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./'], {
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

  calcProject(e: any, res: any) {
    console.log("hi im e", e, res)
    this.total_projects = e;
    this.active_projects = 0
    this.closed_projects = 0;
    for (let i = 0; i < res.length; i++) {
      if (res[i].projectStatus === 'Active') {
        this.active_projects = this.active_projects + 1
      }
    }
    this.closed_projects = this.total_projects - this.active_projects;





    this.active_value = (this.active_projects / this.total_projects) * 100;
    this.closed_value = (this.closed_projects / this.total_projects) * 100;


  }
}

  // function _id(_id: any, string: any) {
  //   throw new Error('Function not implemented.');
  // }

