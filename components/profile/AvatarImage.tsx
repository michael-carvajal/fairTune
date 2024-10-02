import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface AvatarImageProps {
    avatarUrl?: string; // Optional URL for the user's avatar
    size?: number; // Optional size for the image, default is 50
}

const AvatarImage: React.FC<AvatarImageProps> = ({ avatarUrl, size = 100 }) => {
    // Define a default image URL (can be a local asset or external URL)
    const defaultImageUrl = 'https://via.placeholder.com/150'; // Replace with your default image URL or local asset

    return (
        <Image
            source={{
                uri: avatarUrl || defaultImageUrl,
            }}
            style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} // Circular style
            resizeMode="cover"
        />
    );
};

const styles = StyleSheet.create({
    image: {
        width: 50, // Default size
        height: 50,
        borderRadius: 25, // Makes the image circular by default
        backgroundColor: '#e1e4e8', // Optional: Placeholder background color while image loads
    },
});

export default AvatarImage;
