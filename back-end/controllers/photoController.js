import ftp from "basic-ftp";
import fs from 'fs';
import os from 'os';
import path from "path";

export const viewPhoto = async (req, res) => {
    const client = new ftp.Client();
    const filename = req.params.filename;

    try {
        await client.access({
            host: "localhost",
            port: 21,
            user: "roman",
            password: "2004",
            secure: false
        });

        console.log('Conectado al servidor FTP');

        const tempFilePath = path.join(os.tmpdir(), filename);

        await client.downloadTo(tempFilePath, filename);
        console.log('Imagen descargada:', filename);

        res.sendFile(tempFilePath, (err) => {
            if (err) {
                console.error('Error al enviar la imagen:', err);
                res.status(500).send('Error al enviar la imagen');
            } else {
                fs.unlink(tempFilePath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error al eliminar el archivo temporal:', unlinkErr);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error en la conexión FTP:', error);
        res.status(500).send('Error al descargar la imagen');
    } finally {
        client.close();
    }
};