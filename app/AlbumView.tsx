import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, ScrollView, View, FlatList } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

// Define the track data
interface Track {
  id: string;
  name: string;
  track_number: number;
  duration_ms: number;
}

interface Album {
  album_type: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: {
    upc: string;
  };
  label: string;
  popularity: number;
  tracks: Track[];
}

const AlbumDetails: React.FC = () => {
    const params   =  useLocalSearchParams()
    const router = useRouter();
    const { isLoading, data: album } = useQuery<Album>({
        queryKey: ['album_data'],
        queryFn: () => api.getAlbumFromId(params.albumId!),
    })
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  } 

//   console.log(albumData);

    console.log('albumId =======>', params.albumId);

  // Convert duration from milliseconds to minutes and seconds
  const convertDuration = (ms: number) => {
    const minutes = Math.floor(ms / 6000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <ThemedView style={styles.trackContainer} key={item.id}>
      <ThemedText style={styles.trackNumber}>{item.track_number}.</ThemedText>
      <ThemedText style={styles.trackName}>{item.name}</ThemedText>
      <ThemedText style={styles.trackDuration}>{convertDuration(item.duration_ms)}</ThemedText>
    </ThemedView>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Album Cover */}
      <Image source={{ uri: album?.images[0].url }} style={styles.albumCover} />

      {/* Album Info */}
      <ThemedText style={styles.albumName}>{album?.album_type}</ThemedText>
      <ThemedText style={styles.label}>Label: {album?.label}</ThemedText>

      {/* Tracklist */}
      <ThemedText style={styles.sectionHeader}>Tracklist</ThemedText>
      <FlatList
        data={album?.tracks}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
      />

      {/* External Links */}
      <ThemedText style={styles.externalLink} onPress={() => router.push(album?.external_urls.spotify)}>
        Listen on Spotify
      </ThemedText>

      {/* Copyrights */}
      {album?.copyrights.map((copyright: any, index : number) => (
        <ThemedText style={styles.copyright} key={index}>
          {copyright.text}
        </ThemedText>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  albumCover: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  albumName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  trackNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackName: {
    fontSize: 16,
    flex: 1,
  },
  trackDuration: {
    fontSize: 16,
  },
  externalLink: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  copyright: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
  },
});

export default AlbumDetails;
