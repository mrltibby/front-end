import { Component, OnInit } from '@angular/core';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-bionic-files',
  templateUrl: './bionic-files.component.html',
  styleUrls: ['./bionic-files.component.scss'],
})
export class BionicFilesComponent implements OnInit {
  files: FileInfo[] = []

  constructor() {}

  ngOnInit(): void {
    this.displayFiles();
  }

  displayFiles() {
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
    const app = initializeApp(firebaseConfig);
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, 'bionic/');

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log(folderRef);
          
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log(itemRef);
          var files: FileInfo = {filename:''+itemRef.name,link:''};
          this.getURL(itemRef.name+"",files);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }

  getURL(filename: string, file: FileInfo) {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'bionic/' + filename))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        console.log(url);
        file.link = url;
        this.files.push(file);
        console.log("NG ");
        console.log(this.files);
        this.files.reverse();
      })
      .catch((error) => {
        // Handle any errors
      });
  }
}

interface FileInfo{
  filename: string;
  //dateupload:string;
  //type: string;
  link: string;
}
