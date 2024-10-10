import { supabase } from "@/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = {
  getSongCount: async (userId: string) => {
    const { data, error } = await supabase.rpc("get_song_counts", {
      streamer_id: userId,
    });

    if (error) {
      console.error("Error fetching song counts:", error);
      return error;
    }

    return data;
  },
  getUserData: async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId);
    const user = data![0];

    if (error) {
      console.error("Error fetching song counts:", error);
      return error;
    }

    return user;
  },
  getSpotifyToken: async () => {
    const clientId = process.env.EXPO_PUBLIC_SPOTIFY_API_CLIENT_ID!;
    const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_API_CLIENT_SECRET!;
    console.log(clientId, clientSecret);

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Error: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    await AsyncStorage.setItem('spotify_token', tokenData.access_token);

    // Fetch new releases using the access token
    const newReleasesFetch = fetch('https://api.spotify.com/v1/browse/new-releases', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    return Promise.all([tokenData.access_token, newReleasesFetch])
      .then(async ([accessToken, newReleasesResponse]) => {
        if (!newReleasesResponse.ok) {
          throw new Error(`Error: ${newReleasesResponse.statusText}`);
        }

        const newReleasesData = await newReleasesResponse.json();
        return newReleasesData;
      });
  }
};
