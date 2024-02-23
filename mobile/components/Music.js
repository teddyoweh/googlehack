import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, ScrollView, Dimensions,Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HambergerMenu, Magicpen } from 'iconsax-react-native';
import { BlurView } from 'expo-blur';
import { ArrowLeft2, Scroll,Heart,Pause } from 'iconsax-react-native';
import { ye } from '../config/temp';
import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
 
export default function Music({ navigation}) {
    const [play, setPlay] = useState(false);
    const [count, setCount] = useState(1);
    const [dataArray, setDataArray] = useState(ye["1"]); // Initial data array based on count
    const totalItems = Object.keys(ye).length; // Total number of arrays in ye
  
    const animatedValues = useRef(dataArray.map(() => new Animated.Value(0))).current;
    const calculateHeight = (value, index) => {
      const period = 2 * Math.PI / dataArray.length; // Adjust the period based on the length of dataArray
      const scaleFactor = 10; // Adjust the scale factor for the height
      const yOffset = 40; // Adjust the offset for vertical position
      return Math.sin(index * period) * scaleFactor + yOffset;
    };
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(prevCount => (prevCount % totalItems) + 1); // Increment count cyclically
      }, 1000);
  
      return () => clearInterval(interval);
    }, [totalItems]);
  
    useEffect(() => {
      setDataArray(ye[count.toString()]);
    }, [count]);
  
    useEffect(() => {
      Animated.parallel(
        animatedValues.map((value, index) =>
          Animated.timing(value, {
            toValue: calculateHeight(dataArray[index], index), // Use the calculateHeight function
            duration: 1000,
            useNativeDriver: false,
          })
        )
      ).start();
    }, [count, dataArray, animatedValues]);
    return (
    <ImageBackground
    source={{uri:"https://www.rollingstone.com/wp-content/uploads/2023/07/Burna-boy-new-album-big-7-song.jpg"}}
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
           <LinearGradient
          colors={['#0000002e','#0000002e', '#000000d9', ]}
     
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
              Now Playing
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
            source={{uri:"https://www.rollingstone.com/wp-content/uploads/2023/07/Burna-boy-new-album-big-7-song.jpg"}}
            style={{
              width: Dimensions.get('window').width - 44,
              height: Dimensions.get('window').width - 44,
              borderRadius: 10
            }}
            />
            <BlurView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              maxWidth:'auto',
              marginTop:30,
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
                fontSize: 36,
                fontWeight: '400',
          
              }}
              >
                Ye
              </Text>
              <Text
              style={{
                color: '#ddd',
                fontSize: 20,
                fontWeight: '300',
                marginTop: 5
              }}
              >
                Burna Boy
              </Text>
              <View></View>
                </View>
          
  
            </BlurView>
          </View>
          <View style={{height:10, 
            backgroundColor: '#0000002e',
            
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, width: '100%' }}>
     
      </View>
        </LinearGradient>
  
      </BlurView> 
     
      
    </ImageBackground>
    );
  }