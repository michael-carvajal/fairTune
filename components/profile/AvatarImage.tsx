import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface AvatarImageProps {
    avatarUrl?: string; // Optional URL for the user's avatar
    size?: number; // Optional size for the image, default is 50
    name?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ avatarUrl, size = 100, name }) => {
    // Define a default image URL (can be a local asset or external URL)
    const defaultImageUrl = 'https://via.placeholder.com/150'; // Replace with your default image URL or local asset

    return (
        <>
            {
                !avatarUrl ? <View
                    style={[styles.defaultAvatar, { width: size, height: size, borderRadius: size / 2 }]}>
                    <ThemedText style={styles.avatarText} >{name?.slice(0, 1).toUpperCase()}</ThemedText>
                </View> : <Image
                    source={{
                        uri: avatarUrl || defaultImageUrl,
                    }}
                    style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} // Circular style
                    resizeMode="cover"
                />
            }
        </>)
        ;
};

const styles = StyleSheet.create({
    image: {
        width: 50, // Default size
        height: 50,
        borderRadius: 25, // Makes the image circular by default
        backgroundColor: '#e1e4e8', // Optional: Placeholder background color while image loads
    },
    defaultAvatar: {
        width: 50, // Default size
        height: 50,
        borderRadius: 25, // Makes the image circular by default
        backgroundColor: '#e1e4e8', // Optional: Placeholder background color while image loads
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    avatarText: {
        fontSize : 35,
        fontWeight : 'bold'
    }
});

export default AvatarImage;
