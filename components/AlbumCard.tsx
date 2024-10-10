import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

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
    <View style={styles.card}>
      {/* Album Image */}
      <Image source={{ uri: item.images[0].url }} style={styles.image} />
      
      {/* Album Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.albumName}>{item.name}</Text>
        <Text style={styles.artistName}>{item.artists[0].name}</Text>
        <Text style={styles.releaseDate}>Released: {item.release_date}</Text>
      </View>
    </View>
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
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
  },
  albumName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: '#888',
  },
  releaseDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default AlbumCard;
