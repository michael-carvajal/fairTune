import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';
import AlbumCard from '@/components/AlbumCard';

export default function HomeScreen() {
   const { isLoading, data: spotToken} = useQuery({
        queryKey: ['spotify_token'],
        queryFn: () => api.getSpotifyToken(),
    })
  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>
  } 

  console.log(spotToken);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
     <AlbumCard data={spotToken?.albums.items}/> 
    </ParallaxScrollView>
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
