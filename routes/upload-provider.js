import admin from 'firebase-admin'
import {getStorage} from 'firebase-admin/storage'
const bucketStorage = 'dashboard-d7e5d.appspot.com';
const app = admin.initializeApp({
  credential: admin.credential.cert('dashboard-d7e5d-firebase-adminsdk-s4c4m-a9d8cc39c7.json'),
  projectId: "dashboard-d7e5d",
  storageBucket: "dashboard-d7e5d.appspot.com",
})

const storage = getStorage(app)
export default class UploadProvider {

  // * Fixed this method because original does rename instead of move and it doesn't work with docker volume
   async upload(file, key){
    return storage.bucket(this.bucket).upload(file, {
      gzip: true,
      destination: key
    })
  }

  async delete(key, bucket) {
   const bucketStore = storage.bucket(bucket)
   const file = bucketStore.file(key)
   return file.delete()
  }

  // eslint-disable-next-line class-methods-use-this
 async path(key, bucket) {
    const bucketStore = storage.bucket(bucketStorage)
    const file =bucketStore.file(key)
    let filePath = key.split('/').join('%2F')
    return `https://firebasestorage.googleapis.com/v0/b/${this.bucket}/o/${filePath}?alt=media`
  }
}
