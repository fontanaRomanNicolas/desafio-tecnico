import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function InputImage({ label, name, id, register, validation, error }) {
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
            console.error("El archivo seleccionado no es una imagen.");
        }
    };

    console.log("InputImage -> imagePreview", imagePreview);

    return (
        <div className="image-input">
            <label htmlFor={id}>{label}</label>
            <input
                type="file"
                id={id}
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                {...register(name, validation)}
                className="file-input"
            />
            {error && <p className="error-message">{error}</p>}
            {imagePreview && (
                <div className="image-preview">
                    <img
                        src={imagePreview}
                        alt="Previsualización"
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                </div>
            )}
        </div>
    );
}
