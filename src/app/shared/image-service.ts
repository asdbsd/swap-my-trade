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

  uploadTradesImg(id: string, name: string, user: string, file: Blob) {
    const swapsRef = ref(this.fileStore, `swaps/${id}/trades/${user}/${name}`);
    return uploadBytes(swapsRef, file);
  }

  getTradeImages(id: string, userId: string) {
    const currentTradeImagesRef = ref(this.fileStore, `/swaps/${id}/trades/${userId}`);
    return this.getImagesLinks(currentTradeImagesRef);
  }

  getSwapImages(id: string) {
    const currentSwapImagesRef = ref(this.fileStore, `/swaps/${id}`);
    return this.getImagesLinks(currentSwapImagesRef);
  }
 
  getImageUrl(imageRef: StorageReference) {
    return getDownloadURL(imageRef);
  }

  async getImagesLinks(documentRef: StorageReference) {
    const currentImagesLinks: string[] = []

    try {
      const imagesReferences = (await listAll(documentRef)).items;

      for(let imgRef of imagesReferences) {
        try {
          const downloadLink = await this.getImageUrl(imgRef);
          currentImagesLinks.push(downloadLink);
        } catch (err) {
          return [];
        }
      }
    } catch (err) {
      return [];
    }    

    return currentImagesLinks;
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