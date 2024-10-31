import Photo from '../../../models/PhotoModel.js';
import ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs';

export const registerPhoto = async (localFilePath, typePhoto, transaction = null) => {
    try {
        const fileName = generateUniqueFileName(localFilePath);

        const uploadFtp = await uploadToFTP(localFilePath, fileName);

        deleteFile(localFilePath);

        if (!uploadFtp) {
            return { status: 500, error: 'Error al subir la foto al servidor FTP' };
        }

        const newPhoto = await Photo.create(
            {
                photo: fileName,
                type_photo: typePhoto
            },
            { transaction }
        );

        return { status: 201, photo_id: newPhoto.id };

    } catch (error) {
        console.error('Error al registrar la foto:', error);
        throw new Error('Error al registrar la foto');
    }
};

const generateUniqueFileName = (localFilePath) => {
    const ext = path.extname(localFilePath);
    const baseName = path.basename(localFilePath, ext);
    const uniqueSuffix = Date.now();
    return `${baseName}_${uniqueSuffix}${ext}`;
};

export const uploadToFTP = async (localFilePath, remoteFileName) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: "localhost",
            port: 21,
            user: "roman",
            password: "2004",
            secure: false
        });

        console.log('Conectado al servidor FTP');

        await client.uploadFrom(localFilePath, remoteFileName);
        console.log('Archivo subido con éxito:', remoteFileName);

        return true;
    } catch (error) {
        console.error('Error en la conexión FTP:', error);
        throw new Error('Error al subir el archivo al servidor FTP');
    } finally {
        client.close();
    }
};

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error al eliminar el archivo:', err);
            return;
        }
        console.log('Archivo eliminado:', filePath);
    });
};

export const deletePhotoFromFTP = async (remoteFileName) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: "localhost",
            port: 21,
            user: "roman",
            password: "2004",
            secure: false
        });

        console.log('Conectado al servidor FTP');

        await client.remove(remoteFileName);
        console.log('Archivo eliminado con éxito:', remoteFileName);

        return true;
    } catch (error) {
        console.error('Error al eliminar el archivo en el servidor FTP:', error);
        throw new Error('Error al eliminar el archivo en el servidor FTP');
    } finally {
        client.close();
    }
};

export const updatePhoto = async (localFilePath, existingPhotoId, typePhoto, transaction = null) => {
    try {
        const existingPhoto = await Photo.findByPk(existingPhotoId);
        if (!existingPhoto) {
            return { status: 404, error: 'Foto no encontrada' };
        }

        const deleteSuccess = await deletePhotoFromFTP(existingPhoto.photo);
        if (!deleteSuccess) {
            return { status: 500, error: 'Error al eliminar la foto existente en el servidor FTP' };
        }

        const newFileName = generateUniqueFileName(localFilePath);

        const uploadFtp = await uploadToFTP(localFilePath, newFileName);
        if (!uploadFtp) {
            return { status: 500, error: 'Error al subir la nueva foto al servidor FTP' };
        }

        existingPhoto.photo = newFileName;
        existingPhoto.type_photo = typePhoto;
        await existingPhoto.save({ transaction });

        deleteFile(localFilePath);

        return { status: 200, photo_id: existingPhoto.id };

    } catch (error) {
        console.error('Error al actualizar la foto:', error);
        throw new Error('Error al actualizar la foto');
    }
};
