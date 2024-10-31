import multer from "multer";
import path from "path";

const createMulterMiddleware = (fieldName, destinationFolder) => {
    const storage = multer.diskStorage({
        destination: destinationFolder,
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
            cb(null, uniqueName);
        }
    });
    const upload = multer({ storage });

    return upload.single(fieldName);
};
export const uploadSingleDniImage = createMulterMiddleware('dni_image', 'uploads/');

export const uploadSingleEntityImage = createMulterMiddleware('photo', 'uploads/');

export const uploadSingleSchoolImage = createMulterMiddleware('photo', 'uploads/');