import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { UploadFileService } from 'src/app/service/upload-file.service';

@Component({
  selector: 'app-input-script',
  templateUrl: './input-script.component.html',
  styleUrls: ['./input-script.component.css']
})
export class InputScriptComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef | undefined;
  @ViewChild('folderInput', { static: false }) folderInput: ElementRef | undefined;

  selectedFiles: FileList | null = null;
  question: string = '';
  submittedQuestion: string = '';
  responseData: any
  loading: boolean = false
  checkFileSelection:boolean=false
  isResponse:boolean=false

  constructor(private myApiService: UploadFileService) { }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.fileInput) {
      // You can safely access this.fileInput here
    }
  }

  // uploadFile() {
  //   if (this.fileInput) {
  //     this.fileInput.nativeElement.click();
  //   }
  // }

  // handleFiles(event: any) {
  //   if (event.target.files) {
  //     this.selectedFiles = event.target.files;
  //     // Handle selected files and folders here
  //   }
  // }
  submitStatus:boolean=false
  submitQuestion() {
    if(this.fileType=='file'){
      this.loading = true
      console.log(this.selectedFiles)
      this.submittedQuestion = this.question;
      const formData = new FormData();
      console.log("formData1",formData)
      formData.append('inputText', this.submittedQuestion);
      formData.append('is_file_or_folder', this.fileType);
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('file', this.selectedFiles[i]);
        }
      }
      console.log("FD", formData)
      this.myApiService.postData(formData).subscribe((response) => {
        if (response) {
          this.submitStatus=true
          console.log("formData2",formData)
          console.log("resssssssss", response);
          this.responseData = response.result
          this.isResponse=true

          this.loading = false
        }
  
      });

    }
    else if(this.fileType=='folder'){
      this.loading = true
      console.log(this.selectedFiles)
      this.submittedQuestion = this.question;
      const formData = new FormData();
      formData.append('inputText', this.submittedQuestion);
      formData.append('is_file_or_folder', this.fileType);
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('files[]', this.selectedFiles[i]);
        }
      }
      console.log("FD", formData)
      this.myApiService.postData(formData).subscribe((response) => {
        if (response) {
          console.log("resssssssss", response);
          this.submitStatus=true
          this.responseData = response.result
          this.isResponse=true
          this.loading = false
        }
  
      });

    }
   
  }

  copyText() {
    // Copy text to clipboard
    const textArea = document.createElement('textarea');
    textArea.value = this.responseData;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  resetForm() {
    this.checkFileSelection=false
    this.isResponse=false
    this.question = ''; // Clear the question textarea
    this.submittedQuestion = ''; // Clear the result textarea
    this.responseData = '';
    // this.selectedFiles=null
    const fileInput = document.getElementById('selectedFileName') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // Clear the selectedFiles
    this.selectedFiles = null;
    const resultTextArea = document.getElementById('fileInput') as HTMLInputElement;
    if (resultTextArea) {
      resultTextArea.value = '';
    }
    const folderInput = document.getElementById('folderInput') as HTMLInputElement;
    if (folderInput) {
      folderInput.value = '';
    }

    this.selectedFiles = null; // Reset selected files to null

    // Reset any other form fields if needed
  }
  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }


  displayFileName() {
    if (this.fileInput) {
      const fileInput = this.fileInput.nativeElement;
      const fileDisplay = document.getElementById('fileDisplay') as HTMLInputElement;

      if (fileDisplay) {
        if (fileInput.files.length > 0) {
          const fileName = fileInput.files[0].name;
          fileDisplay.value = fileName;
        } else {
          fileDisplay.value = '';
        }
      }
    }
  }

  saveResponse() {
    const textToSave = this.responseData;
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.txt'; // Specify the default file name here

    // Trigger a click event on the anchor element
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    a.dispatchEvent(event);

    // Clean up
    window.URL.revokeObjectURL(url);
  }



  //   onSubmit(form: any): void {
  //     const formData = new FormData();
  //     formData.append('inputText', this.inputText);

  //     if (this.selectedFiles) {
  //         for (let i = 0; i < this.selectedFiles.length; i++) {
  //             formData.append('files', this.selectedFiles[i]);
  //         }
  //     }

  //     this.http.post<any>('http://127.0.0.1:5000/upload', formData).subscribe(
  //         data => {
  //             this.result = data.result;
  //         },
  //         error => {
  //             console.error('Error:', error);
  //             this.result = 'An error occurred.';
  //         }
  //     );
  // }

  // onFileChange(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }

  fileType: any
  getFileType(type: any) {
    this.fileType = type
    console.log(this.fileType)
  }

  onFileChange(event: any, fileType: string): void {
   
    console.log('test')
    if (fileType == 'file') {
      this.checkFileSelection=true
      this.fileType=fileType
      this.selectedFiles = event.target.files;
      const selectedFileName = event.target.files[0]?.name || '';
      const selectedFileInput = document.getElementById('selectedFileName') as HTMLInputElement; // Narrow down the type
      console.log("..", selectedFileName, selectedFileInput, fileType)

      if (selectedFileInput) {
        selectedFileInput.value = selectedFileName;
      }
      // event.target.value = '';

    }
    else if (fileType == 'folder') {
      this.checkFileSelection=true
      this.fileType=fileType
      this.selectedFiles = event.target.files;
      const selFold=event.target.files[0]?.webkitRelativePath;
      const foldName=selFold?.split('/')[0]
      console.log(foldName)
      // const selectedFileName = event.target.files[0]?.name || '';
      const selectedFileInput = document.getElementById('selectedFileName') as HTMLInputElement; // Narrow down the type
      // console.log("..", selectedFileName, selectedFileInput, fileType)

      if (foldName) {
        selectedFileInput.value = foldName;
      }
      // event.target.value = '';
    }


    // Rest of your code...

    // this.selectedFiles = event.target.files;


    // Handle the selected file or folder based on the 'fileType' parameter (file or folder).
    // ...
  }


  localUrl: any
  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  keyupInputQuestion(event:any){
    this.submittedQuestion=event.target.value
  }

  selectFile(type:any) {
    // Programmatically trigger the file input click event
    const resultTextArea = document.getElementById('fileInput') as HTMLInputElement;
    if (resultTextArea) {
      resultTextArea.value = '';
    }
    const folderInput = document.getElementById('folderInput') as HTMLInputElement;
    if (folderInput) {
      folderInput.value = '';
    }
    if (type=='file' && this.fileInput) {
      this.fileInput.nativeElement.click();
    }
    else if(type=='folder' && this.folderInput){
      this.folderInput.nativeElement.click();

    }

  }

  newQuestion(){
    this.submittedQuestion=''
    this.question=''
    this.responseData=''
  }
  


}