import { StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/utils/api'
import { useLocalSearchParams } from 'expo-router'

const SongCount = () => {
    const { userId } = useLocalSearchParams<{ userId: string }>(); // Extract the params
    console.log('User ID:', userId);
    const { isLoading, data: songCount } = useQuery({
        queryKey: ['songCount'],
        queryFn: () => api.getSongCount(userId),
    })
    return (
        <ThemedView style={styles.container}>
            <ThemedText>SongCount</ThemedText>
        </ThemedView>
    )
}

export default SongCount

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})