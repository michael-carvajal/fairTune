import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type PromiseOnPress = () => Promise<void>;

interface PressableButtonProps {
    onPress?: () => void | PromiseOnPress; // Function to handle the button press event
    title: string; // Text displayed on the button
    disabled?: boolean; // Optional: Disable the button if necessary
    color?: string; // Optional: Button background color
    spreadStyles? : any;
}

const PressableButton: React.FC<PressableButtonProps> = ({ onPress, title, disabled = false, color, spreadStyles }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                {...spreadStyles},
                { backgroundColor: color || '#1DB954' }, // Dynamically apply color or default to Spotify green
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
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonPressed: {
        opacity: 0.8, // Slightly reduce opacity when pressed
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
