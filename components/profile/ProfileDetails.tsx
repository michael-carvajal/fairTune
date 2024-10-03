import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/providers/SuperbaseProvider';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AvatarImage from './AvatarImage';
import PressableButton from '../PressableButton';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useRouter } from 'expo-router';

const ProfileDetails = () => {
    const { signOut, session, } = useAuth(); // use custom hook from the provider
    const router = useRouter(); // useRouter to handle navigation

    // const { isLoading, data: songCount } = useQuery({
    //     queryKey: ['songCount'],
    //     queryFn: () => api.getSongCount(session?.user.id!),
    // })
    const { isLoading, data: currUser } = useQuery({
        queryKey: ['songCount'],
        queryFn: () => api.getUserData(session?.user.id!),
    })
    const navToSongCount = () => {
        router.push(`/SongCount?userId=${session?.user.id!}`)
    }

    console.log(currUser);
    // console.log(songCount);
    if (isLoading) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText style={styles.title}>Loading...</ThemedText>
            </ThemedView>
        )
    }
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>{currUser?.full_name}</ThemedText>
            <AvatarImage name={currUser.full_name}/>
            <PressableButton onPress={navToSongCount} spreadStyles={{marginTop: 20}} title='View stream count'>

            </PressableButton>
            <PressableButton onPress={signOut} title='Sign out' color='red' spreadStyles={{ marginTop: 200 }}><ThemedText></ThemedText></PressableButton>
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
