import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView,Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ArrowLeft2, Heart, Pause } from 'iconsax-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';

function shortenText(text) {
  const maxLength = 16;
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
}

function stripWhiteSpace(inputString) {
  return inputString.replace(/^\s+|\s+$/g, '');
}

function secondsToMinutesAndSeconds(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) {
    return 'Invalid input';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Placeholder ProgressBar component
const ProgressBar = ({ currentPosition, totalDuration }) => {
    // Calculate the ratio of the current position to the total duration
    const progressRatio = totalDuration > 0 ? currentPosition / totalDuration : 0;
  
    return (
    //   <View style={{ flex: 1, backgroundColor: '#0000002e', borderRadius: 30, overflow: 'hidden' }}>
     
    //     <View style={{ height: '100%', width: `${progressRatio * 100}%`, backgroundColor: '#eee', borderRadius: 30 }} />
    //   </View>
    <View
    style={{
      height: 8,
      backgroundColor: '#0000002e',
      borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 0,
      width: '100%',
    }}
  >
    <View
      style={{
        height: 8,
        backgroundColor: '#eee',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 1,
        width: `${progressRatio * 100}%`
      }}
    ></View>
  </View>
    );
  };
export default function TestMusic({ navigation, route }) {
  const { data } = route.params;
  const [sound, setSound] = useState();
  const [play, setPlay] = useState(false);
  const [activeSong, setActiveSong] = useState(data.songs[0]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

 

 
  const loadSound = async (audioUrl) => {
  try{
    // console.log("Sound Object:", sound);

//     const {sound}  = Audio.Sound.createAsync(
//       { uri: audioUrl },
//       { shouldPlay: false }
//     )
console.log(audioUrl)
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      // { shouldPlay: false }
    );
    
    // console.log("Sound Object:", sound);

   
  
    setSound(sound);
  

  }
  catch(error){
    alert(error)
    console.error("Error creating sound:", error);

  }
      // Get the status to obtain the duration
      const status = await sound.getStatusAsync();
      setTotalDuration(status.durationMillis || 0);
  };

  



  useEffect( () => {
      console.log(activeSong) 
      loadSound(activeSong.audio_url);
  },[]);
  const togglePlayPause = () => {

    if (sound) {
 
      setPlay(!play);
      if (play) {
        sound.pauseAsync();
      } else {
        
        sound.playAsync();
      }
    }
  };

  const playPrevious = async () => {
    const currentIndex = data.songs.findIndex((song) => song === activeSong);
    const newIndex = (currentIndex - 1 + data.songs.length) % data.songs.length;
    const newSong = data.songs[newIndex];
    setActiveSong(newSong);
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      await loadSound(newSong.audio_url);
      sound.playAsync();
    }
  };

  const playNext = async () => {
    const currentIndex = data.songs.findIndex((song) => song === activeSong);
    const newIndex = (currentIndex + 1) % data.songs.length;
    const newSong = data.songs[newIndex];
    setActiveSong(newSong);
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      await loadSound(newSong.audio_url);
      sound.playAsync();
      // storeRecentlyPlayed(song)
    }
  };

  const selectSong = async (selectedSong) => {
    setActiveSong(selectedSong);
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      await loadSound(selectedSong.audio_url);
      sound.playAsync();
    }
  };
  // const storeRecentlyPlayed = async (song) => {
  //   try {
  //     const recentlyPlayedSongsString = await AsyncStorage.getItem('recentlyPlayedSongs');
  //     const recentlyPlayedSongs = recentlyPlayedSongsString ? JSON.parse(recentlyPlayedSongsString) : [];

   
  //     const updatedRecentlyPlayedSongs = [song, ...recentlyPlayedSongs];

 
  //     const maxLength = 10;
  //     const trimmedRecentlyPlayedSongs = updatedRecentlyPlayedSongs.slice(0, maxLength);

 
  //     await AsyncStorage.setItem('recentlyPlayedSongs', JSON.stringify(trimmedRecentlyPlayedSongs));
  //   } catch (error) {
  //     console.error('Error storing recently played song:', error);
  //   }
  // };
  function millisecondsToMinutesAndSeconds(milliseconds) {
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
      return 'Invalid input';
    }
  
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  useEffect(() => {
    const updateCurrentPosition = async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          setCurrentPosition(status.positionMillis || 0);
        }
      };

    const interval = setInterval(updateCurrentPosition, 1000);
    return () => clearInterval(interval);
  }, [sound, currentPosition]);
 
  useEffect(() => {
    const cleanup = async () => {
      if (sound) {
        await sound.unloadAsync();
      }
    };
  
    return () => {
      cleanup();
    };
  }, []);
  
  return (
    <ImageBackground
      source={{ uri: activeSong.thumbnail_url }}
      style={{
        flex: 1,
        resizeMode: 'contain',
        justifyContent: 'space-between',
      }}
    >
      <BlurView
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'transparent',
        }}
        intensity={100}
        tint="dark"
      >
        <ScrollView>
          <LinearGradient
            colors={['#00000000', '#00000000', '#00000000']}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              height: '100%',
              width: '100%',
              paddingVertical: 60,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.goBack();
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  backgroundColor: '#0000002e',
                }}
              >
                <ArrowLeft2 size="22" color="#fff" />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '500',
                  marginLeft: 4,
                }}
              >
                {data.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  backgroundColor: '#0000002e',
                }}
              >
                <Heart size="22" color="#fff" />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 30,
              }}
            >
              <Image
                source={{ uri: activeSong.thumbnail_url }}
                style={{
                  width: Dimensions.get('window').width / 1.5 - 44,
                  height: Dimensions.get('window').width / 1.5 - 44,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: 'auto',
                  marginTop: 10,
                  width: Dimensions.get('window').width - 44,
                  borderRadius: 10,
                  overflow: 'hidden',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                intensity={10}
                tint="light"
              >
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      fontWeight: '400',
                    }}
                  >
                    {activeSong.title}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingHorizontal: 20,
              }}
            >
                         <ProgressBar currentPosition={currentPosition} totalDuration={totalDuration} />

            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: '#ddd', fontSize: 13 }}>{millisecondsToMinutesAndSeconds(currentPosition)}
</Text>
              <Text style={{ color: '#ddd', fontSize: 13 }}>{secondsToMinutesAndSeconds(activeSong.duration)}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <FontAwesome name="backward" size={24} color={play ? '#fff' : '#aaa'} onPress={playPrevious} />
              <FontAwesome
                name={play ? 'pause' : 'play'}
                size={44}
                color="#fff"
                onPress={togglePlayPause}
                style={{ backgroundColor: play ? '#7059f91b' : 'transparent' }}
              />
              <FontAwesome name="forward" size={24} color={play ? '#fff' : '#aaa'} onPress={playNext} />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              {data.songs.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => selectSong(item)}
                  style={{
                    backgroundColor: '#00000038',
                    borderWidth: 1,
                    borderColor: '#00000038',
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    paddingVertical: 11,
                    marginBottom: 10,
                    marginRight: 9,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={{ uri: item.thumbnail_url }} style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }} />
                    <View>
                      <Text style={{ color: '#fff', fontSize: 20, fontWeight: '300' }}>{shortenText(stripWhiteSpace(item.song_name))}</Text>
                      <Text style={{ color: '#aaa', fontSize: 18, fontWeight: '300', marginTop: 2 }}>{item.artist}</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </LinearGradient>
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
}
