import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions,Animated, ImageBackground, TouchableOpacity,Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HambergerMenu, Magicpen } from 'iconsax-react-native';
import { BlurView } from 'expo-blur';
import { ArrowLeft2, Scroll,Heart,Pause } from 'iconsax-react-native';
import { ye } from '../config/temp';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
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
function secondsToMinutesAndSeconds(seconds) {
  if (typeof seconds !== 'number' || seconds < 0) {
      return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
export default function Music({ navigation,route}) {
    const [play, setPlay] = useState(false);
 
    const {data} = route.params;
 
    const [activeSong, setActiveSong] = useState(data.songs[0]);
    const [currentDuration,setCurrentDuration] = useState("0:00")
    return (
    <ImageBackground
    source={{uri:activeSong.thumbnail_url}}
    style={{
      flex: 1,
      resizeMode: "contain",
      justifyContent: "space-between",
    
   
    }}
    >

     
      <BlurView
      style={{
        height: "100%",
        width: "100%",
        backgroundColor:'transparent',
     
     
      }}
      intensity={100}
      tint="dark"
      >
        <ScrollView>

        
           <LinearGradient
          colors={['#00000000','#00000000', '#00000000', ]}
     
          start={[0, 0]}
          end={[1, 1]}
        
          
       
        style={{
          height: "100%",
          width: "100%",
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
            <Heart size="22" color="#fff"/>
            </View>
          </View>
          <View
          style={{
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 30
          }}
          >
            <Image
            source={{uri:activeSong.thumbnail_url}}
            style={{
              width: Dimensions.get('window').width/1.5 - 44,
              height: Dimensions.get('window').width/1.5 - 44,
              borderRadius: 10
            }}
            />
            <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth:'auto',
              marginTop:10,
              width: Dimensions.get('window').width - 44,
              borderRadius: 10,
              overflow: 'hidden',
              paddingHorizontal: 20,
              paddingVertical: 10
            }}
            
            intensity={10}
            tint='light'
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
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-around',
            paddingHorizontal:20
          }}
          >

           
          <View style={{height:8, 
            backgroundColor: '#0000002e',
            borderRadius:30,
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 0, width: '100%' }}>
        <View style={{height:8, 
            backgroundColor: '#eee',
            borderRadius:30,
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 1, width: '90%' }}>
     
      </View>
      </View>
     
      </View>
      <View
          style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingVertical:10,
            paddingHorizontal:20
          }}
          >

          <Text
          style={{
            color:"#ddd",
            fontSize:13
          }}
          >
            0:00
          </Text>
         
      <Text
            style={{
              color:"#ddd",
              fontSize:13
            }}
      >
      {secondsToMinutesAndSeconds(activeSong.duration)}
      </Text>
      </View>
      <View
      style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-evenly"
      }}
      >
      <FontAwesome name="backward" size={24} color="#fff" />  
      <FontAwesome name="play" size={44} color="#fff" />  
      <FontAwesome name="forward" size={24} color="#fff" />  
        </View>
        <View
        style={{
          paddingHorizontal:10,
          paddingVertical:20
        }}
        >
          {
            data.songs.map((item,index)=>{
              return (
                <Pressable
                onPress={() => {
               
              }}
          key={index}
          style={{
              backgroundColor:  '#00000038' ,
              borderWidth: 1,
              borderColor:  '#00000038' , 
              paddingHorizontal: 20,
              borderRadius: 20,
              paddingVertical: 11,
            marginBottom:10,
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
{/*          
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
            </Pressable> */}
       
            
          </Pressable>
              )
            })
          }
        </View>
        </LinearGradient>
        </ScrollView>
      </BlurView> 
     
      
    </ImageBackground>
    );
  }