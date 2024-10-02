import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/providers/SuperbaseProvider';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AvatarImage from './AvatarImage';
import PressableButton from '../PressableButton';

const ProfileDetails = () => {
    const { getUserData, signOut, session, currUser, getSongCount } = useAuth(); // use custom hook from the provider
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUserData(session?.user.id!)
        getSongCount(session?.user.id!)
    }, [])


    console.log(currUser);

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>{currUser?.full_name}</ThemedText>
            <AvatarImage />
            <PressableButton onPress={signOut} title='Sign out' color='red' spreadStyles={{marginTop: 200}}><ThemedText></ThemedText></PressableButton>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
});

export default ProfileDetails;
