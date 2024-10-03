import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useLocalSearchParams } from 'expo-router';

const SongCount = () => {
    const { userId } = useLocalSearchParams<{ userId: string }>(); // Extract the params
    console.log('User ID:', userId);

    // Fetch song count data
    const { isLoading, data: songCount } = useQuery({
        queryKey: ['songCount', userId], // Ensures the query is scoped to the specific user
        queryFn: () => api.getSongCount(userId),
        initialData: [], // Ensuring that songCount starts as an empty array
    });

    // Log the data returned from the API
    console.log('Song Count Data:', songCount);

    if (isLoading) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        );
    }

    // Ensure songCount is an array before using map
    const songCountArray = Array.isArray(songCount) ? songCount : [];

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Song Count</ThemedText>

            {/* Table Header */}
            <View style={styles.tableRow}>
                <ThemedText style={[styles.tableHeader, styles.tableCell]}>Title</ThemedText>
                <ThemedText style={[styles.tableHeader, styles.tableCell]}>Stream Count</ThemedText>
                <ThemedText style={[styles.tableHeader, styles.tableCell]}>Cost</ThemedText>
            </View>

            {/* Table Rows */}
            {songCountArray.map((song: { title: string, songcount: number }, index: number) => (
                <View key={index} style={styles.tableRow}>
                    <ThemedText style={styles.tableCell}>{song.title}</ThemedText>
                    <ThemedText style={styles.tableCell}>{song.songcount}</ThemedText>
                    <ThemedText style={styles.tableCell}>${(song.songcount * 0.011).toFixed(2)}</ThemedText>
                </View>
            ))}
        </ThemedView>
    );
};

export default SongCount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableHeader: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
});
