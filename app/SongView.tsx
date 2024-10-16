import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { Audio } from 'expo-av'; // Import expo-av for audio playback
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const SongView: React.FC = () => {
    const { trackId } = useLocalSearchParams();
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fetch track details using React Query
    const { isLoading, data: track } = useQuery({
        queryKey: ['track_data', trackId],
        queryFn: () => api.getTrackFromId(trackId),
        enabled: !!trackId, // Only run if trackId is available
    });

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync(); // Unload sound when component unmounts
            }
            : undefined;
    }, [sound]);

    const playPreview = async () => {
        if (track?.preview_url) {
            const { sound: newSound } = await Audio.Sound.createAsync({
                uri: track.preview_url,
            });
            setSound(newSound);
            setIsPlaying(true);
            await newSound.playAsync(); // Play the audio
        } else {
            console.log('No preview URL available');
        }
    };

    const stopPreview = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    };

    const togglePlay = async () => {
        if (isPlaying) {
            stopPreview();
        } else {
            playPreview();
        }
    };

    // Convert milliseconds to minutes and seconds
    const convertDuration = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds.padStart(2, '0')}`;
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!track) {
        return <ThemedText>No track found</ThemedText>;
    }

    return (
        <ThemedView style={styles.container}>
            {/* Album Artwork */}
            <Image source={{ uri: track.album?.images?.[0]?.url }} style={styles.albumArt} />

            {/* Track Info */}
            <ThemedText style={styles.trackName}>{track.name}</ThemedText>
            <ThemedText style={styles.artistName}>By: {track.album?.artists?.[0]?.name}</ThemedText>
            <ThemedText style={styles.trackDuration}>Duration: {convertDuration(track.duration_ms)}</ThemedText>

            {/* Play Button */}
            <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
                <Text style={styles.playButtonText}>{isPlaying ? 'Stop' : 'Play Preview'}</Text>
            </TouchableOpacity>

            {/* External Links */}
            <TouchableOpacity onPress={() => Linking.openURL(track.external_urls.spotify)}>
                <Text style={styles.spotifyLink}>Listen on Spotify</Text>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        flex : 1
    },
    albumArt: {
        width: 300,
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
    },
    trackName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    artistName: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5,
        textAlign: 'center',
    },
    trackDuration: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 20,
        textAlign: 'center',
    },
    playButton: {
        backgroundColor: '#1DB954',
        padding: 15,
        borderRadius: 50,
        marginBottom: 20,
    },
    playButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    spotifyLink: {
        fontSize: 16,
        color: '#1DB954',
        textDecorationLine: 'underline',
    },
});

export default SongView;
