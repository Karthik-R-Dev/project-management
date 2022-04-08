import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueComponent } from './issue/issue.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path:"",component:ProjectsComponent
  },
  {
    path:"project",component:ProjectsComponent
  },
  {
    path:"issue",component:IssueComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
