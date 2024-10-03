import { StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const SongCount = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>SongCount</ThemedText>
    </ThemedView>
  )
}

export default SongCount

const styles = StyleSheet.create({
    container : {
        flex : 1,
    }
})