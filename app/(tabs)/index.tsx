import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import AlbumCard from '@/components/AlbumCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const { isLoading, data: spotToken } = useQuery({
    queryKey: ['spotify_token'],
    queryFn: () => api.getSpotifyToken(),
  })
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  }

  console.log(spotToken);

  return (
    <ThemedView style={{ paddingTop: insets.top }}>
      <AlbumCard data={spotToken?.albums.items} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
