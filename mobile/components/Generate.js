import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions,Animated, ImageBackground, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HambergerMenu, InfoCircle, Magicpen, Play, Send, TickCircle } from 'iconsax-react-native';
import { BlurView } from 'expo-blur';
import { ArrowLeft2, Scroll,Heart,Pause } from 'iconsax-react-native';
import { ye } from '../config/temp';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { createStackNavigator } from '@react-navigation/stack';
import PagerView from 'react-native-pager-view';
import axios from 'axios';
import { api_endpoints } from '../config/server';
import { Audio } from 'expo-av';
import { savePlaylistMethod, storeData } from '../config/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

function shortenText(text) {
    const maxLength =16;
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  }
  function stripWhiteSpace(inputString) {
    // remove starting and ending white space
    return inputString.replace(/^\s+|\s+$/g, '');
     
  }

  function RenderSugx({ item, index, songs, setSongs, suggestions, setSuggestions, currentPlayingIndex, setCurrentPlayingIndex }) {
    const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
    const playSound = async (audioUrl, currentIndex) => {
      try {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
  
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
  
        setSound(newSound);
        setCurrentPlayingIndex(currentIndex);
        setIsPlaying(true);
  
        await newSound.playAsync();
      } catch (error) {
        console.error('Error playing sound', error);
      }
    };
  
    const pauseSound = async () => {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        
      }
    };
  
    const resumeSound = async () => {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    };
  
    useEffect(() => {
      return sound
        ? () => {
            sound.stopAsync();
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    return (
        <View
        style={{
            flexDirection:'row',
            alignItems: 'center',
            marginBottom: 20,
        }}
        >

       
        <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                if (songs.includes(item)) {
                    setSongs(songs.filter((i) => i !== item))
                } else {
                    setSongs([...songs, item])
                }
            }}
        key={index}
        style={{
            backgroundColor: songs.includes(item) ? '#7059f91b' : '#0000002e',
            borderWidth: 1,
            borderColor: songs.includes(item) ? '#7059f9' : 'transparent',
            paddingHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 11,
         
            marginRight: 9,
            width: "100%",
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
                <Image  source={{uri: item.thumbnail_url}} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    marginRight: 10
                }}/>
                <View>
                <Text   
            style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '300'
            }}
            >
                {shortenText(stripWhiteSpace(item.song_name))}
            </Text>
                <Text   
            style={{
                color: '#aaa',
                fontSize: 18,
                fontWeight: '300',
                marginTop: 2
            }}
            >
                {item.artist}
            </Text>
                </View>

            </View>
       
          <Pressable onPress={() => {
      if (sound && currentPlayingIndex === index) {
        isPlaying ? pauseSound() : resumeSound();
      } else {
        playSound(item.audio_url, index);
      }
    }}
          style={{
            backgroundColor: '#7059f91b',
            borderWidth: 1,
            borderColor: '#7059f9',
        
            borderRadius: 50,
            height: 40,
            width: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
             {sound && currentPlayingIndex === index ? (
      isPlaying ? (
        <Pause size="23" variant='Bold' color="#7059f9" />
      ) : (
        <Play size="23" variant='Bold' color="#7059f9" />
      )
    ) : (
      <Play size="23" variant='Bold' color="#7059f9" />
    )}
          </Pressable>
     
          
        </Pressable>
 
        </View>
    )
}
function RenderPlaylistSongs({ item, index, data, setData, currentPlayingIndex, setCurrentPlayingIndex }) {
    const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
    const playSound = async (audioUrl, currentIndex) => {
      try {
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
  
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
  
        setSound(newSound);
        setCurrentPlayingIndex(currentIndex);
        setIsPlaying(true);
  
        await newSound.playAsync();
      } catch (error) {
        console.error('Error playing sound', error);
      }
    };
  
    const pauseSound = async () => {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        
      }
    };
  
    const resumeSound = async () => {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    };
  
    useEffect(() => {
      return sound
        ? () => {
            sound.stopAsync();
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);
  
    return (
        <View
        style={{
            flexDirection:'row',
            alignItems: 'center',
            marginBottom: 10,
        }}
        >

       
        <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // if (songs.includes(item)) {
                //     setSongs(songs.filter((i) => i !== item))
                // } else {
                //     setSongs([...songs, item])
                // }
            }}
        key={index}
        style={{
            backgroundColor:   '#0000002e',
            borderWidth: 1,
            borderColor: 'transparent',
            paddingHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 11,
         
            marginRight: 9,
            width: "100%",
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
                {/* <Image  source={{uri: item.thumbnail_url}} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    marginRight: 10
                }}/> */}
                <View>
                <Text   
            style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '300'
            }}
            >
                {shortenText(stripWhiteSpace(item.song_name))}
            </Text>
                <Text   
            style={{
                color: '#aaa',
                fontSize: 18,
                fontWeight: '300',
                marginTop: 2
            }}
            >
                {item.artist}
            </Text>
                </View>

            </View>
       
          <Pressable onPress={() => {
      if (sound && currentPlayingIndex === index) {
        isPlaying ? pauseSound() : resumeSound();
      } else {
        playSound(item.audio_url, index);
      }
    }}
          style={{
            backgroundColor: '#7059f91b',
            borderWidth: 1,
            borderColor: '#7059f9',
        
            borderRadius: 50,
            height: 40,
            width: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
             {sound && currentPlayingIndex === index ? (
      isPlaying ? (
        <Pause size="23" variant='Bold' color="#7059f9" />
      ) : (
        <Play size="23" variant='Bold' color="#7059f9" />
      )
    ) : (
      <Play size="23" variant='Bold' color="#7059f9" />
    )}
          </Pressable>
     
          
        </Pressable>
 
        </View>
    )
}
function RenderSugesstions({suggestions,setSuggestions,songs,setSongs}) {
         const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
      
        return (
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {suggestions.map((item, index) => {
              return (
                <RenderSugx
                  key={index}
                  item={item}
                  index={index}
                  setSongs={setSongs}
                  songs={songs}
                  setSuggestions={setSuggestions}
                  suggestions={suggestions}
                  currentPlayingIndex={currentPlayingIndex}
                  setCurrentPlayingIndex={setCurrentPlayingIndex}
                />
              );
            })}
          </ScrollView>
        );
      }
function RenderTempo({tempo,setTempo}) {
   
    const options = [
       "Very Slow",
         "Slow",
            "Moderate",
            "Fast",
            "Very Fast",
       



    ]
    return (
        <ScrollView
        contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
          
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >

            {options.map((item, index) => {
                return (
                    <Pressable
                    key={index}
                    style={{
                        backgroundColor: tempo.includes(item) ? '#7059f91b' : '#0000002e',
                        borderWidth: 1,
                        borderColor: tempo.includes(item) ? '#7059f9' : '#0000002e',
                        paddingHorizontal: 30,
                        borderRadius: 50,
                        paddingVertical: 21,
                        marginBottom: 20,
                        marginRight: 5,
                        width: "100%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        if (tempo.includes(item)) {
                            setTempo(tempo.filter((i) => i !== item))
                        } else {
                            setTempo([...tempo, item])
                        }
                    }}
                    >
                        <Text
                        style={{
                            color: tempo.includes(item) ? '#fff' : '#fff',
                            fontSize: 22,
                            fontWeight: '300'
                        }}
                        >
                            {item}
                        </Text>
                        {
                            tempo.includes(item) ?
                            <TickCircle size="32" variant='Bold' color="#7059f9"/>:
                            <View/>
                        }
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
function RenderGenre({genre,setGerne}) {
   
    const options = [
        "Pop",
        "Hip Hop",
        "Rap",
        "R&B",
        "Jazz",
        "Rock",
        "Country",
        "Reggae",
        "Soul",
        "Gospel",
        "Afrobeat",
       



    ]
    return (
        <ScrollView
        contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
          
        }}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        >

            {options.map((item, index) => {
                return (
                    <Pressable
                    key={index}
                    style={{
                        backgroundColor: genre.includes(item) ? '#7059f91b' : '#0000002e',
                        borderWidth: 1,
                        borderColor: genre.includes(item) ? '#7059f9' : '#0000002e',
                        paddingHorizontal: 30,
                        borderRadius: 50,
                        paddingVertical: 21,
                        marginBottom: 20,
                        marginRight: 5,
                        width: "100%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        if (genre.includes(item)) {
                            setGerne(genre.filter((i) => i !== item))
                        } else {
                            setGerne([...genre, item])
                        }
                    }}
                    >
                        <Text
                        style={{
                            color: genre.includes(item) ? '#fff' : '#fff',
                            fontSize: 22,
                            fontWeight: '300'
                        }}
                        >
                            {item}
                        </Text>
                        {
                            genre.includes(item) ?
                            <TickCircle size="32" variant='Bold' color="#7059f9"/>:
                            <View/>
                        }
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
function RenderMoods({mooods,setMoods}) {
 
    const options = [
        "Happy",
        "Sad",
        "Angry",
        "Romantic",
        "Chill",
        "Energetic",
        "Calm",

    ]
    return (
        <ScrollView
        contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
          
        }}
        >
            {options.map((item, index) => {
                return (
                    <Pressable
                    key={index}
                    style={{
                        backgroundColor: mooods.includes(item) ? '#7059f91b' : '#0000002e',
                        borderWidth: 1,
                        borderColor: mooods.includes(item) ? '#7059f9' : '#0000002e',
                        paddingHorizontal: 30,
                        borderRadius: 50,
                        paddingVertical: 21,
                        marginBottom: 20,
                        marginRight: 5,
                        width: "100%",
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        if (mooods.includes(item)) {
                            setMoods(mooods.filter((i) => i !== item))
                        } else {
                            setMoods([...mooods, item])
                        }
                    }}
                    >
                        <Text
                        style={{
                            color: mooods.includes(item) ? '#fff' : '#fff',
                            fontSize: 22,
                            fontWeight: '300'
                        }}
                        >
                            {item}
                        </Text>
                        {
                            mooods.includes(item) ?
                            <TickCircle size="32" variant='Bold' color="#7059f9"/>:
                            <View/>
                        }
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
function RenderCount({count,setCount}) {
    return (
<TextInput
 autoFocus={false}
 placeholder='15'
 placeholderTextColor={'#40444b'}
 keyboardAppearance='dark'
 style={{
     color:'#fff',
     fontSize:80,
     fontWeight:'600',
  
   width: '100%',
   textAlign: 'center',
    
     paddingBottom:10,
     marginBottom:30
 }}

 value={count.toString()}
 onChangeText={(text) => {
     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
     setCount(text);
 }}
 maxLength={2}

 inputMode='numeric'
 returnKeyLabel='Done'
 keyboardType='numeric'
 enablesReturnKeyAutomatically={true}
 caretHidden={true}  
 />
    )
}
function RenderContext({context,setContext}) {
    return (
<TextInput
 autoFocus={false}
 placeholder='More Context (Optional)'
 placeholderTextColor={'#40444b'}
 keyboardAppearance='dark'
 multiline={true}
 style={{
     color:'#fff',
     fontSize:30,
     fontWeight:'600',
  
   width: '90%',
   textAlign: 'center',
    
     paddingBottom:10,
     marginBottom:30
 }}

 value={context.toString()}
 onChangeText={(text) => {
     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
     setContext(text);
 }}
 

 
 returnKeyLabel='Done'
 
 enablesReturnKeyAutomatically={true}
 caretHidden={true}  


 />
    )
}
function RenderCreatePlaylist({data,setData,playlistName,setPlayListName}) {
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

    return (
        <ScrollView>
            <TextInput
 autoFocus={false}
 placeholder='Playlist Name'
 placeholderTextColor={'#40444b'}
 keyboardAppearance='dark'
 multiline={true}
 style={{
     color:'#fff',
     fontSize:30,
     fontWeight:'600',
  
   width: '90%',
   textAlign: 'center',
    
     paddingBottom:10,
     marginBottom:30
 }}

 value={playlistName.toString()}
 onChangeText={(text) => {
     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
     setPlayListName(text);
 }}
 

 
 returnKeyLabel='Done'
 
 enablesReturnKeyAutomatically={true}
 caretHidden={true}  


 />
 {
        data &&
        data.map((item, index) => {
      
            return (
                <View
                key={index}
                style={{
             paddingHorizontal:10
                }}
                >
                   <RenderPlaylistSongs item={item} song={item} index={index} data={data} setData={setData} currentPlayingIndex={index} setCurrentPlayingIndex={index} />
                </View>
            )
        })
 }

        </ScrollView>
    )

}
export default function GeneratePlay({ navigation }) {
    const [count, setCount] = useState(15);
    const [mooods, setMoods] = useState([]);
    const [genre, setGerne] = useState([]);
    const [tempo, setTempo] = useState([]);
    const [context, setContext] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);
    const [data,setData] = useState(null)
    const [playlistName,setPlayListName] = useState("")
    function savePlaylist() {
        
        savePlaylistMethod(playlistName, data)
    }
   
    
    const sendRequest = async () => {
        
        setLoading(true)
        await axios.post(api_endpoints.create_5,{
            count: count,
            mood: mooods,
            genre: genre,
            temp: tempo,
            context: context
        }).then((res) => {
            console.log(res.data)
            setSuggestions(res.data.suggestions)
            setLoading(false)
            handleScroll({nativeEvent: {position: index + 1}})
        }
        ).catch((err) => {
            console.log(err.config)

        })
    }
    const sendRequest_Main = async () => {
        // alert('Creating Playlist')
        setLoading(true)
        await axios.post(api_endpoints.create_15,{
            count: count,
            mood: mooods,
            genre: genre,
            temp: tempo,
            context: context,
            songs: songs
        }).then((res) => {
            console.log(res.data)
            setData(res.data.songs)
            setLoading(false)
            handleScroll({nativeEvent: {position: index + 1}})
        }
        ).catch((err) => {
            console.log(err.config)

        })
    }
    const commonProps = {
        initialPage: 0,
        onPageScroll: (e) => console.log('onPageScroll', e.nativeEvent),
        onPageScrollStateChanged: (e) => console.log('onPageScrollStateChanged', e.nativeEvent),
        onPageScrollStateChanged: (e) => console.log('onPageScrollStateChanged', e.nativeEvent),
        onPageSelected: (e) => console.log('onPageSelected', e.nativeEvent),
        count:count,
        setCount:setCount,
        mooods:mooods,
        setMoods:setMoods,
        genre:genre,
        setGerne:setGerne,
        tempo:tempo,
        setTempo:setTempo,
        context:context,
        setContext:setContext,
        suggestions:suggestions,
        setSuggestions:setSuggestions,
        songs:songs,
        setSongs:setSongs,
        isLoading:isLoading,
        setLoading:setLoading,
        playlistName:playlistName,
        setPlayListName:setPlayListName,
        data:data,
        setData:setData
    }
    const titles = [
        "Number of Songs",
        "Moods",
        "Genre",
        "Tempo",
        "Context",
        'Suggestions',

    ]
    const pages = [
   <RenderCount {...commonProps} />,
    <RenderMoods {...commonProps} />,
    <RenderGenre {...commonProps} />,
    <RenderTempo {...commonProps} />,
    <RenderContext {...commonProps} />,
    <RenderSugesstions {...commonProps} />,
    <RenderCreatePlaylist {...commonProps} />,
    ]
    const pagerRef = useRef(null);
    const [index, setIndex] = useState(0);
    const handleScroll = (event) => {
        
            const { position } = event.nativeEvent;
            const currentPageIndex = Math.floor(position);
        setIndex(currentPageIndex);
        pagerRef.current?.setPage(currentPageIndex);
    }

    return (
        <LinearGradient
        colors={['#2b174b', '#2e1f39', '#010303']}
        style={styles.container}
        start={[0, 0]}
        end={[1, 1]}
      
        
      >
        <KeyboardAvoidingView
        behavior='padding'
        // keyboardVerticalOffset={100}
        style={{
            height: Dimensions.get('window').height,
            flex:1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
           
         
     
        }}
        >
           <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
                    paddingHorizontal: 20,
                    width: '100%',
            
          }}
          >
            <TouchableOpacity
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                navigation.goBack()}}
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
            <ArrowLeft2 size="22" color="#fff"/>
            </TouchableOpacity>
            <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: '500',
              marginLeft: 4
            }}
            >
              {titles[index]}
            </Text>
            <View
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
            <InfoCircle size="22" color="#fff"/>
            </View>
          </View>
     
           <PagerView style={{
                flex:1,
                
                width: Dimensions.get('window').width - 0,
                height: Dimensions.get('window').height / 2.2,
            }} initialPage={0}
            
            ref={pagerRef}
            // scrollEnabled={false}

   
            >
   {pages.map((page, index) => {
    return (
        <View
        key={index}
        style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
       
 
        }}
        >
            {page}
        </View>
    )
   })}
    </PagerView>
  
        <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 30,
            width: '100%',
        
        }}
        >
          <TouchableOpacity
          style={{
            backgroundColor:isLoading ? '#6c6882' : '#7059f9',
            paddingVertical: 24,
            paddingHorizontal: Dimensions.get('window').width / 3 - 10,
            borderRadius: 50,
            // width: "90%",
            flexDirection: 'row',
            justifyContent: 'center',
         alignContent: 'center',
         alignSelf: 'center',
            alignItems: 'center',
          
          }}
          disabled={isLoading}
          onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            if (isLoading) {
                return
            }else{
                if (index == 4) {
                    sendRequest()
                } else {
                    if(index == 5) {
                       sendRequest_Main()

                    }
                    else if(index == 6) {
                        savePlaylist()
                        navigation.goBack()
                    }
                    else{
                        handleScroll({nativeEvent: {position: index + 1}})
                    }
               
     
                }
            }
          
          }}
          >
            <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
              textAlign: 'center'
            }}
            >
                {
                    isLoading ? 'Loading...': index == 4 ? 'Generate' : 'Next'
                }
        
              </Text>
              {
                isLoading &&
                <ActivityIndicator style={{
                    marginLeft: 10
                    
                }} size={19} color={"#fff"} />

              }
              {
                isLoading==false &&
                <Magicpen size="20" color="#fff"
                style={{
                  marginLeft: 10
                }}
                />
              }
           
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
 
      paddingVertical: 60,
      paddingBottom:30,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      
      // paddingHorizontal: 30,
    
    },
  });
  