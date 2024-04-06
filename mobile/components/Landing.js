import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions,Animated, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Add, HambergerMenu, Magicpen, Music, MusicLibrary2 } from 'iconsax-react-native';
import { BlurView } from 'expo-blur';
import { ArrowLeft2, Scroll,Heart,Pause } from 'iconsax-react-native';
import { ye } from '../config/temp';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { removeLastTwoPlaylists } from '../config/storage';
 

export default function Landing({ navigation }) {
  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
 
    const [playlists, setPlaylists] = useState([]);
    const [recentlyPlayedSongs,setRecentlyPlayedSongs] = useState([])
    useEffect(() => {
      const fetchPlaylistsAndRecentSongs = async () => {
        try {
          const existingPlaylists = await AsyncStorage.getItem('playlists');
          const existingRecentSongs = await AsyncStorage.getItem('recentlyPlayedSongs');
  
          let parsedPlaylists = existingPlaylists ? JSON.parse(existingPlaylists) : [];
          let parsedRecentSongs = existingRecentSongs ? JSON.parse(existingRecentSongs) : [];
  
          setPlaylists(parsedPlaylists);
          setRecentlyPlayedSongs(parsedRecentSongs);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchPlaylistsAndRecentSongs();
    }, [playlists]);
 
    return (
        <LinearGradient
        colors={['#2b174b', '#192f43', '#010303']}
        style={styles.container}
        start={[0, 0]}
        end={[1, 1]}
      
        
      >
        <View>
        <View
        style={{
          flexDirection:'column'
        }}
        >
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 30,
            paddingHorizontal: 20,
          }}
          >
            <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'transparent',
              paddingVertical: 2,
              paddingHorizontal: 12,
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: 'white',
    
            
            }}
            >
            <HambergerMenu size="15" color="#fff"/>
            <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '300',
              marginLeft: 4
            
            }}
            >
              Menu
            </Text>
    
            </View>
            <View>
              <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
              
                marginTop: 0
              
              }}
              source={{uri:"https://s3.amazonaws.com/www-inside-design/uploads/2018/01/rick-morty-sq.jpg"}}
              />
            </View>
          </View>
          <Text
          style={{      paddingHorizontal: 20, color: 'white', fontSize: 18, fontWeight: '300' }}
          >
            Hi, Welcome Back - Teddy 🔥
          </Text>
    
          <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 20,
          
          }}
          >
            <Text
            style={{
              color: 'white',
              fontSize: 50,
              fontWeight: '300'
            }}
            >
              Listen To Your  
            </Text>
            <Text
             style={{
              color: 'white',
              fontSize: 50,
              fontWeight: '300',
              fontStyle: 'italic',
              textAlign: 'right'
            }}
            >
              Favourite Music
            </Text>
          </View>
          <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 20
          }}
          >
            <View
            style={{
              flexDirection:'column'
            }}
            >
    
           
       <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 20,
          }}
          >
            <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600'
            
            }}
            >
              Rencently Playlists
            </Text>
            <Text
            style={{
              color: '#9c8cfc',
              fontSize: 14,
              fontWeight: '400'
            }}
            >
              See All
            </Text>
    
          </View>
    <ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    style={{
      marginTop: 3,
     width: '100%',
     
    }}
    contentContainerStyle={{
      alignItems:'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal:10
    }}
    
    >
      {
        playlists.map((item, index) => {
          return (
            <Pressable
            onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                navigation.navigate('Music',{
                  data:item
                })
                
            }}
            style={{
           
              backgroundColor: 'transparent',
              borderRadius: 27,
              // paddingVertical: 20,
              // paddingHorizontal: 20,
              width: Dimensions.get('window').width/3,
              marginRight: 10,
              marginTop: 10,
              flexDirection: 'column',
              justifyContent: 'flex-start',
      
              alignItems:'flex-start',
              
              
          
            }}
            >
             
            <Image
            source={{uri:item["songs"][0]["thumbnail_url"]}}
            style={{
              width: Dimensions.get('window').width/3,
              height:  Dimensions.get('window').width/3+10,
              borderRadius: 8
            }}
            />
         
              <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                // width: Dimensions.get('window').width - 80,
                paddingHorizontal:10
      
          
              }}
              >     
        
                <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '400',
                  marginTop: 10
                }}
                >
                  {item.name}
                </Text>
           
        
                
              
             
              </View>
            </Pressable>
          )
      })}

      {
      playlists.length==0 &&
   
             <TouchableOpacity
            onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                // navigation.navigate('Generate')
                
            }}
            style={{
           
              backgroundColor:'#7059f91b',
              borderWidth: 1,
              borderColor:'#7059f9'  ,
              borderRadius: 27,
            
              width: Dimensions.get('window').width-18,
              height:  Dimensions.get('window').width/3+10,
              marginRight: 10,
              marginTop: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              
              alignItems:'center',
              
              
          
            }}
            >
             <MusicLibrary2 size="64" color="#7059f9"
             variant='Bold'
             />
             <Text
             style={{
              color:'#7059f9',
              marginTop:10,
              fontWeight:'500'
             }}
             >
              Empty
             </Text>

          
          
            </TouchableOpacity>
    
      }
         
           
    
    </ScrollView>
    </View>
    <View
            style={{
              flexDirection:'column'
            }}
            >
    
           
       <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 20,
          }}
          >
            <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600'
            
            }}
            >
              Rencently Played
            </Text>
            <Text
            style={{
              color: '#9c8cfc',
              fontSize: 14,
              fontWeight: '400'
            }}
            >
              See All
            </Text>
    
          </View>
    <ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    style={{
      marginTop: 10,
     width: '100%',
     
    }}
    contentContainerStyle={{
      alignItems:'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal:10
    }}
    
    >
      {
        recentlyPlayedSongs.map((item, index) => {
          return (
            <Pressable
            onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                
                
            }}
            style={{
           
              backgroundColor: 'transparent',
              borderRadius: 27,
              // paddingVertical: 20,
              // paddingHorizontal: 20,
              width: Dimensions.get('window').width/3,
              marginRight: 10,
              marginTop: 10,
              flexDirection: 'column',
              justifyContent: 'flex-start',
      
              alignItems:'flex-start',
              
              
          
            }}
            >
             
            <Image
            source={{uri:item["thumbnail_url"]}}
            style={{
              width: Dimensions.get('window').width/3,
              height:  Dimensions.get('window').width/3+10,
              borderRadius: 8
            }}
            />
         
              <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                // width: Dimensions.get('window').width - 80,
                paddingHorizontal:10
      
          
              }}
              >     
        
                <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '400',
                  marginTop: 10
                }}
                >
                  {item.song_name}
                </Text>
           
        
                
              
             
              </View>
            </Pressable>
          )
      })}
       {
      recentlyPlayedSongs.length==0&&
   
      <TouchableOpacity
     onPress={()=>{
         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
         // navigation.navigate('Generate')
         
     }}
     style={{
    
       backgroundColor:'#7059f91b',
       borderWidth: 1,
       borderColor:'#7059f9'  ,
       borderRadius: 27,
     
       width: Dimensions.get('window').width-18,
       height:  Dimensions.get('window').width/3+10,
       marginRight: 10,
       marginTop: 10,
       flexDirection: 'column',
       justifyContent: 'center',
       
       alignItems:'center',
       
       
   
     }}
     >
      <MusicLibrary2 size="64" color="#7059f9"
      variant='Bold'
      />
      <Text
      style={{
       color:'#7059f9',
       marginTop:10,
       fontWeight:'500'
      }}
      >
       No Recently Played Songs
      </Text>

   
   
     </TouchableOpacity>

}
    
    </ScrollView>
    </View>
          </View>
        </View>
        </View>
        <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 30
        }}
        >
          <TouchableOpacity
          style={{
            backgroundColor: '#7059f9',
            paddingVertical: 20,
            paddingHorizontal: 40,
            borderRadius: 50,
            width: "90%",
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          
          }}
          onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            navigation.navigate('Generate')
          }}
          >
            <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500'
            }}
            >
              Generate Playlist
              </Text>
              <Magicpen size="20" color="#fff"
              style={{
                marginLeft: 10
              }}
              />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
            }


            const styles = StyleSheet.create({
                container: {
                  flex: 1,
                  paddingVertical: 60,
                  paddingBottom:30,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 30,
                
                },
              });
              