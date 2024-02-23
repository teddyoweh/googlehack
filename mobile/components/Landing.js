import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions,Animated, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HambergerMenu, Magicpen } from 'iconsax-react-native';
import { BlurView } from 'expo-blur';
import { ArrowLeft2, Scroll,Heart,Pause } from 'iconsax-react-native';
import { ye } from '../config/temp';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { createStackNavigator } from '@react-navigation/stack';
export default function Landing({ navigation }) {
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
        [...Array(3)].map((item, index) => {
          return (
            <Pressable
            onPress={()=>{
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                navigation.navigate('Music')
                
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
            source={{uri:"https://www.rollingstone.com/wp-content/uploads/2023/07/Burna-boy-new-album-big-7-song.jpg"}}
            style={{
              width: Dimensions.get('window').width/3,
              height:  Dimensions.get('window').width/3+10,
              borderRadius: 4
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
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 10
                }}
                >
                  Ye.
                </Text>
           
                <Text
                style={{
                  color: '#ddd',
                  fontSize: 16,
                  fontWeight: '300',
                  marginTop: 3
                }}
                >
                  Burna Boy
                </Text>
                
              
             
              </View>
            </Pressable>
          )
      })}
    
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
        [...Array(3)].map((item, index) => {
          return (
            <View
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
            source={{uri:"https://www.rollingstone.com/wp-content/uploads/2023/07/Burna-boy-new-album-big-7-song.jpg"}}
            style={{
              width: Dimensions.get('window').width/3,
              height:  Dimensions.get('window').width/3+10,
              borderRadius: 4
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
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 10
                }}
                >
                  Ye.
                </Text>
           
                <Text
                style={{
                  color: '#ddd',
                  fontSize: 16,
                  fontWeight: '300',
                  marginTop: 3
                }}
                >
                  Burna Boy
                </Text>
                
              
             
              </View>
            </View>
          )
      })}
    
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
              