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
};
