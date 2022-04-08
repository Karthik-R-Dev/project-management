import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ToolbarComponent } from './toolbar/toolbar.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProjectsComponent } from './projects/projects.component'
import {MatCardModule} from '@angular/material/card';
import { IssueComponent } from './issue/issue.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon'
import {MatTabsModule} from "@angular/material/tabs"
import {MatListModule} from "@angular/material/list";
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component'
import {MatInputModule} from "@angular/material/input"
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from "@angular/material/select";
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { DeleteProjectDialogComponent } from './delete-project-dialog/delete-project-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CreateIssueDialogComponent } from './create-issue-dialog/create-issue-dialog.component';
import { CreateIssueCloseComponent } from './create-issue-close/create-issue-close.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProjectsComponent,
    IssueComponent,
    CreateProjectDialogComponent,
    EditProjectDialogComponent,
    DeleteProjectDialogComponent,
    CreateIssueDialogComponent,
    CreateIssueCloseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })                                                                         
    
  ],
  entryComponents:[ProjectsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
