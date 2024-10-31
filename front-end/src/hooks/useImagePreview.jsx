import { useState } from 'react';

export const useImagePreview = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setImagePreview(preview);
        }
    };

    return { imagePreview, handleImageChange };
};
