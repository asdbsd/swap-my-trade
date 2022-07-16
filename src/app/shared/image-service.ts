import { Injectable } from '@angular/core';
import { listAll, Storage, StorageReference } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private fileStore: Storage
  ) { }

  uploadSwapsImg(id: string, name: string, file: Blob) {
    const swapsRef = ref(this.fileStore, `swaps/${id}/${name}`);
    return uploadBytes(swapsRef, file);
  }

  uploadtradesImg(id: string, name: string, user: string, file: Blob) {
    const swapsRef = ref(this.fileStore, `swaps/${id}/trades/${user}/${name}`);
    return uploadBytes(swapsRef, file);
  }

  async getSwapImages(id: string, name: string = '') {
    const currentSwapImagesRef = ref(this.fileStore, `/swaps/${id}`);

    if(name) {
      const currentSwapImagesRef = ref(this.fileStore, `/swaps/${id}`);
    }
    const currentImages: string[] = [''];
    
    try {
      const imgList = (await listAll(currentSwapImagesRef)).items;

      for(let imgRef of imgList) {
        try {
          const downloadLink = await this.getImageUrl(imgRef);
          currentImages.push(downloadLink);
        } catch (err) {
          return [];
        }
      }
    } catch (err) {
      return [];
    }
    
    return currentImages.filter(v => v !== '');

  }
 
  getImageUrl(imageRef: StorageReference) {
    return getDownloadURL(imageRef);
  }


}


// currentImageUrl: string; // to store the downloadUrl of image to be displayed
// selectedFiles: Array<File>; // to store selected files in the File Explorer

// this.profileEditSub = this.auth.user$.subscribe(async (user) => {
//   ...

//   /** 
//    * you only store the storage reference (user.userPhoto) in firestore, not the download url,
//    * so you need to fetch it again
//    */
//   this.currentImageUrl = await this.storage
//     .ref(user.userPhoto)
//     .getDownloadURL()
//     .toPromise();
// });

// onFileChosen(event: any) {
//     this.selectedFiles = event.target.files; // just assigns the selected file/s in <input> this.selectedFiles
// }

// async onSubmit() {
//     if (this.selectedFiles.length) {
//         // Get selected file
//         const file = this.selectedFiles[0];

//         // Get the fullPath in Storage after upload
//         const fullPathInStorage = await this.uploadImage(this.userId, file);

//         /**
//          * You can now store the fullPathInStorage in firestore
//          *
//          * afs.update(...)
//          */

//         // Get the downloadUrl for the src of img
//         this.currentImageUrl = await this.storage
//             .ref(fullPathInStorage)
//             .getDownloadURL()
//             .toPromise();
//     }
// }

// async uploadImage(uid, file): Promise<string> {
//     /**
//      * You can add random number in file.name to avoid overwrites,
//      * or replace the file.name to a static string if you intend to overwrite
//      */
//     const fileRef = this.storage.ref(uid).child(file.name);

//     // Upload file in reference
//     if (!!file) {
//       const result = await fileRef.put(file);

//       return result.ref.fullPath;
//     }
// }