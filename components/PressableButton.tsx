import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Router, useRouter } from 'expo-router'; // Assuming you're using Expo Router for navigation

type PromiseOnPress = () => Promise<void>;

interface PressableButtonProps {
    onPress?: () => void | PromiseOnPress;
    title: string;
    disabled?: boolean;
    color?: string;
    spreadStyles?: any;
}

const PressableButton: React.FC<PressableButtonProps> = ({ onPress, title, disabled = false, color, spreadStyles }) => {

    const handlePress = (router : Router) => {
        if (onPress) {
            onPress(); // Trigger custom onPress if provided
        } 
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.button,
                { ...spreadStyles },
                { backgroundColor: color || '#1DB954' },
                pressed && styles.buttonPressed,
                disabled && styles.buttonDisabled,
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
        opacity: 0.8,
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default PressableButton;
