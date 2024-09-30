import { app } from "./firebase";
import { getStorage, ref, listAll, getDownloadURL, connectStorageEmulator } from "firebase/storage";

const storage = process.env.NODE_ENV === "production" ? getStorage(app, app.options.storageBucket) : getStorage();

if (process.env.NODE_ENV !== "production") {
    connectStorageEmulator(storage, "127.0.0.1", 9199);
}
