import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface PressableButtonProps {
    onPress?: () => void; // Function to handle the button press event
    title: string; // Text displayed on the button
    disabled?: boolean; // Optional: Disable the button if necessary
}

const PressableButton: React.FC<PressableButtonProps> = ({ onPress, title, disabled = false }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed, // Apply pressed state styles
                disabled && styles.buttonDisabled, // Apply disabled state styles
            ]}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1DB954', // Spotify green
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#1AA34A', // Darker green when pressed
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9', // Grey background when disabled
    },
    buttonText: {
        color: '#fff', // White text color
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PressableButton;
