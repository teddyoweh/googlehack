import AsyncStorage from '@react-native-async-storage/async-storage';
 


export const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
  
    }
  };

  export const savePlaylistMethod = async (playlistName, data) => {
    try {
        const existingPlaylists = await AsyncStorage.getItem('playlists');
        let playlists = existingPlaylists ? JSON.parse(existingPlaylists) : [];

        playlists.push({
            "name": playlistName,
            "songs": data,
        });

        await AsyncStorage.setItem('playlists', JSON.stringify(playlists));
 
    } catch (error) {
        console.error('Error saving playlist:', error);
 
    }}


    export const removeLastTwoPlaylists = async () => {
        try {
            const existingPlaylists = await AsyncStorage.getItem('playlists');
            let playlists = existingPlaylists ? JSON.parse(existingPlaylists) : [];
    
            if (playlists.length >= 2) {
                playlists.splice(-2); // Remove the last two playlists
                await AsyncStorage.setItem('playlists', JSON.stringify(playlists));
            } else {
                // Handle case where there are fewer than two playlists
                console.warn('There are fewer than two playlists to remove.');
            }
    
        } catch (error) {
            console.error('Error removing last two playlists:', error);
        }
    };
    