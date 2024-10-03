import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/providers/SuperbaseProvider';
import React, { useState } from 'react';
import { TextInput, StyleSheet, Alert } from 'react-native';
import PressableButton from '../PressableButton';

const SignIn = () => {
    const { signIn } = useAuth(); // use custom hook from the provider
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await signIn(email, password);
            Alert.alert('Success', 'Signed in successfully!');
        } catch (error) {
            Alert.alert('Error', 'Sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.card}>
                <ThemedText style={styles.title}>Welcome to FairTune</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />
                <ThemedView style={styles.signInButton} />
                <PressableButton title={loading ? 'Signing in...' : 'Sign In'} onPress={handleSignIn} disabled={loading} />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        width: '100%', // This ensures it takes up the available width
        maxWidth: 500, // Set a maximum width
        padding: 20,
        borderRadius: 10,
        shadowColor: 'gray',
        marginHorizontal: 'auto',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3, // Adds shadow on Android
        display: 'flex',
        gap: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        color: 'white',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    success: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
        textAlign: 'center',
    },
    signInButton: {
        marginTop: 15
    }
});

export default SignIn;
