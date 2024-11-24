"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userImagesRef = void 0;
exports.getDefaultUserImage = getDefaultUserImage;
const firebase_1 = require("./firebase");
const storage_1 = require("firebase/storage");
const storage = process.env.NODE_ENV === "production" ? (0, storage_1.getStorage)(firebase_1.app, firebase_1.app.options.storageBucket) : (0, storage_1.getStorage)();
if (process.env.NODE_ENV !== "production") {
    (0, storage_1.connectStorageEmulator)(storage, "127.0.0.1", 9199);
}
// A ref to the directory to upload user profile pictures to
exports.userImagesRef = (0, storage_1.ref)(storage, "users/images");
function getDefaultUserImage() {
    return process.env.NODE_ENV === "production"
        ? "https://firebasestorage.googleapis.com/v0/b/income-tracker-88b7c.appspot.com/o/users%2Fimages%2Fdefault.png?alt=media"
        : "http://127.0.0.1:9199/v0/b/income-tracker-88b7c.appspot.com/o/users%2Fimages%2Fdefault.png?alt=media";
}
