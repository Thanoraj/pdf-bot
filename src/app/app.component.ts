import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form: FormGroup;
  file: File | undefined;
  query : String | undefined;
  response: String = "";
  tableOfContents : [] = [];
  selectedContents : string[] = [];
  showFiltered : boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: '',
      file: null
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.form.get('file')!.setValue(this.file);
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.form.get('file')!.value);
    console.log(formData);
    console.log("in");
  //this.selectedFile = event.target.files[0];
  // const formData = new FormData();
  //   formData.append('file', this.selectedFile!);

     this.http.post('http://127.0.0.1:5601/uploadFile',formData,).subscribe((res)=>{
      console.log(res);
     });

     const query1 = "Generate table of content for this book in json with the key of title";
     this.sendGetRequest(query1)
     .subscribe((res)=> {
      console.log(res);
      try {
        const toc = JSON.parse(res);
        this.tableOfContents = toc["content"]
        console.log(this.tableOfContents)
      } catch (e) {
        console.error(e); // SyntaxError: Unexpected token : in JSON at position 29
      }
      
     });
  
  }

  onSubmit() {
    //console.log(this.form.get('name')!.value);
    //let term = this.form.get('name')!.value;
    //console.log(term.trim());
     //let term = "Get 2 questions";

  // Add safe, URL encoded search parameter if there is a search term
     
  }

  private sendGetRequest (query: string) {
    const options = query ?
      { params: new HttpParams().set('text', query) } : {};
     return this.http.get("http://localhost:5601/query?",options)
     .pipe(map((res)=>{
      if (res.hasOwnProperty("text")){
        return res['text'];
      }
     },),);
     
  }

  selectItem(content : string) {
    this.selectedContents.push(content);
  }

  onChecked () {
    this.showFiltered = true;
    console.log(this.selectedContents);
  }
}



// import { Component } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'pdf-bot';
//   selectedFile: File | undefined;
//   topic : String = "";
//   rating : number = 1;
//   response: string='any';
//   error: string='any';
//   configuration: any;
//   text: string | undefined ='';
//   fileToUpload : FileList | undefined;
  
//   constructor(
//     private http: HttpClient,) { }

  

// onFileSelected(event: any) {
//   console.log("in");
//   this.selectedFile = event.target.files[0];
//   const formData = new FormData();
//     formData.append('file', this.selectedFile!);

//      this.http.post('http://127.0.0.1:5601/uploadFile',formData,).subscribe((res)=>{
//       console.log(res);
//      }, (e) => {
//       console.log(e);
//      });
//      //term = term.trim();
//      let term = "Get 2 questions";

//   // Add safe, URL encoded search parameter if there is a search term
//   const options = term ?
//    { params: new HttpParams().set('text', term) } : {};
//      let response = this.http.get("http://localhost:5601/query?",options).subscribe((res)=> {
//       console.log(res);
//      });
//      console.log(response);
//   }

//   postFile() {
//     console.log("in2");
//   }
// }
