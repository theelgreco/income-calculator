import { app } from "./firebase";
import { getStorage, ref, connectStorageEmulator } from "firebase/storage";

const storage = process.env.NODE_ENV === "production" ? getStorage(app, app.options.storageBucket) : getStorage();

if (process.env.NODE_ENV !== "production") {
    connectStorageEmulator(storage, "127.0.0.1", 9199);
}

// A ref to the directory to upload user profile pictures to
export const userImagesRef = ref(storage, "users/images");

export function getDefaultUserImage() {
    return process.env.NODE_ENV === "production"
        ? "https://firebasestorage.googleapis.com/v0/b/income-tracker-88b7c.appspot.com/o/users%2Fimages%2Fdefault.png?alt=media"
        : "http://127.0.0.1:9199/v0/b/income-tracker-88b7c.appspot.com/o/users%2Fimages%2Fdefault.png?alt=media";
}
