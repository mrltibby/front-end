import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { initializeApp } from 'firebase/app';
import { Guid } from 'guid-typescript';

import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CompleteDialogComponent } from '../complete-dialog/complete-dialog.component';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  hide = true;
  id: Guid | null = null;
  fileToUpload: File | null = null;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  event: any;
  form: FormGroup;
  progress: number = 0;
  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      name: [''],
      avatar: [null],
    });
  }
  ngOnInit() {}

  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    this.event = event;
    console.log(this.selectedFiles);
  }

  upload() {
    this.hide = false;
    console.log('uploading');
    const firebaseConfig = {
      apiKey: 'AIzaSyCRDMrr9fhO9hH1_OFmlv-BOzfsmy8D3Sg',
      authDomain: 'bionicwebapp.firebaseapp.com',
      databaseURL:
        'https://bionicwebapp-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'bionicwebapp',
      storageBucket: 'bionicwebapp.appspot.com',
      messagingSenderId: '49326962456',
      appId: '1:49326962456:web:ff333abe85c26c53d6506d',
      measurementId: 'G-H9G63HPD7M',
    };
    if (this.selectedFiles) {
      const app = initializeApp(firebaseConfig);
      const storage = getStorage();
      const filename = this.id + '.pdf';
      const storageRef = ref(storage, 'pdf/' + filename);
      const file: File | null = this.selectedFiles[0];
      console.log(this.event.target.files[0]);

      const uploadTask = uploadBytesResumable(
        storageRef,
        this.event.target.files[0]
      );

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          this.hide = true;
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //Call API for PDF TO HTML
            //CALL API for HTML TO BIONIC
            console.log('File available at', downloadURL);
            this.pdfToHTML(downloadURL);
          });
        }
      );
    }
  }

  pdfToHTML(downloadURL: string) {
    var path = environment.backendAPI + '/api/PdfConverter';
    console.log(path);
    this.http
      .post<any>(path, {
        link: downloadURL,
      })
      .subscribe((data) => {
        console.log(data);
        this.htmltoBionic(data[0]);
        this.hide = true;
        
        const dialogRef = this.dialog.open(CompleteDialogComponent);

        dialogRef.afterClosed().subscribe((result) => {
          console.log(`Dialog result: ${result}`);
        });
      });
  }

  htmltoBionic(downloadURL: string) {
    var path =
      environment.backendAPI + '/api/BionicConverter?url=' + downloadURL;
    this.http.post<any>(path, {}).subscribe((data) => {
      console.log(data);
      //this.htmltoBionic(data[0]);
      this.hide = true;
    });
  }
}

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}
