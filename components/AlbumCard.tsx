import React from 'react';
import { Text, Image, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';

interface AlbumData {
  album_type: string;
  artists: {
    name: string;
    id: string;
  }[];
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
  release_date: string;
  id: string;
}

interface Props {
  data: AlbumData[];
}

const AlbumCard: React.FC<Props> = ({ data }) => {
  const renderItem = ({ item }: { item: AlbumData }) => (
    <Link style={styles.container} href={{ pathname: '/AlbumView' }}>

    <ThemedView style={styles.card}>
      {/* Album Image */}
      <Image source={{ uri: item.images[0].url }} style={styles.image} />
      
      {/* Album Info */}
      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.albumName}>{item.name}</ThemedText>
        <ThemedText style={styles.artistName}>{item.artists[0].name}</ThemedText>
        <ThemedText style={styles.releaseDate}>Released: {item.release_date}</ThemedText>
      </ThemedView>
    </ThemedView>
    </Link>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({

  container: {
    width : '100%'
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor : "#3333",
    borderRadius: 10,
    shadowColor: '#1111',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width : '100%'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor : "#2222",

  },
  albumName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
  },
  releaseDate: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default AlbumCard;
