import { supabase } from "@/supabase";

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
    const clientId = process.env.EXPO_PUBLIC_SPOTIFY_API_CLIENT_ID!
     const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_API_CLIENT_SECRET!
    console.log(clientId, clientSecret);
    
 
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },
};
