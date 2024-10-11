import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function AlbumView() {
    const { albumId } = useLocalSearchParams()

    console.log('albumId =======>', albumId);

    return (
        <View>
            <Text>AlbumView</Text>
        </View>
    )
}