import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


//  project api's

  postProduct(data:any){  
    return this.http.post<any>("http://localhost:3001/api/create",data);
  }
  
  getProduct(){
    return this.http.get<any>("http://localhost:3001/api/getProject");
  }
  putProduct(data:any,_id:string){
    return this.http.put<any>("http://localhost:3001/api/updateProject/"+_id,data)
  }
  deleteProduct(_id:string){
    return this.http.delete<any>("http://localhost:3001/api/deleteProject/"+_id)
  }


  // issue api's

  postIssue(data:any){
    return this.http.post<any>("http://localhost:3001/api/createIssue",data)
  }
  getIssue(){
    return this.http.get<any>("http://localhost:3001/api/getIssue")
  }
  putIssue(data:any,id:number){
    return this.http.put<any>("http://localhost:3001/api/reopen/"+id,data)
  }
  deleteIssue(id:string){
    return this.http.delete<any>("http://localhost:3001/api/close/"+id)
  }

  // total project value

  getTotalValue(){
    return this.http.get<any>("http://localhost:3001/api/totalProjects")
  }
  getTotalIssue(){
    return this.http.get<any>("http://localhost:3001/api/totalIssues")
  }
}


