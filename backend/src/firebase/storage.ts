import { app } from "./firebase";
import { getStorage, ref, connectStorageEmulator, FirebaseStorage } from "firebase/storage";

let firebaseURL;
let storage: FirebaseStorage;

if (process.env.NODE_ENV === "development") {
    firebaseURL = "http://127.0.0.1:9199/";
    storage = getStorage();
    connectStorageEmulator(storage, "127.0.0.1", 9199);
} else {
    firebaseURL = "https://firebasestorage.googleapis.com/";
    storage = getStorage(app, app.options.storageBucket);
}

// A ref to the directory to upload user profile pictures to
export const userImagesRef = ref(storage, "users/images");

const bucketLocation = "v0/b/income-tracker-88b7c.appspot.com/o/";
const defaultImageFilename = "users%2Fimages%2Fdefault.png?alt=media";

export const defaultUserImage = `${firebaseURL}${bucketLocation}${defaultImageFilename}`;
