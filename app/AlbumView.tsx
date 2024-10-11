import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { api } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { ThemedView } from '@/components/ThemedView'
export default  function AlbumView() {
    const params   =  useLocalSearchParams()
    const { isLoading, data: albumData} = useQuery({
        queryKey: ['album_data'],
        queryFn: () => api.getAlbumFromId(params.albumId!),
    })
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  } 

//   console.log(albumData);

    console.log('albumId =======>', params.albumId);

    return (
        <ThemedView>
            <ThemedText>AlbumView</ThemedText>
        </ThemedView>
    )
}