import React, { useState } from 'react';
import axios from 'axios';

const CreateArtwork = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post('/api/artworks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Artwork created:', response.data);
            // Reset form fields
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Error creating artwork:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price ($):</label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
            </div>
            <button type="submit">Create Artwork</button>
        </form>
    );
};

export default CreateArtwork; 