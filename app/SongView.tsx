import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const SongView = () => {
    const {trackId} = useLocalSearchParams();

  return (
    <View>
      <Text>SongView of track ID {trackId}</Text>
    </View>
  )
}

export default SongView