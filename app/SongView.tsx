import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api'; // Your API object
import { Audio } from 'expo-av'; // Import expo-av for audio playback

const SongView: React.FC = () => {
  const { trackId } = useLocalSearchParams();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

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
      await newSound.playAsync(); // Play the audio
    } else {
      console.log('No preview URL available');
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!track) {
    return <Text>No track found</Text>;
  }

  return (
    <View>
      <Text>SongView of track ID {trackId}</Text>
      <Text>{track.name}</Text>
      <Button title="Play Preview" onPress={playPreview} />
    </View>
  );
};

export default SongView;
