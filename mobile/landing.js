import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Landing(){

  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
      alert('damn')
      console.log(keys, 'this is the keys')
    } catch(e) {
      // read key error
    }
  

    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }
  getAllKeys()
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
            paddingBottom: 30
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
          style={{ color: 'white', fontSize: 18, fontWeight: '300' }}
          >
            Hi, Welcome Back - Teddy 🔥
          </Text>
    
          <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 10
          
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20
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
              color: '#14b0c2',
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
     
    }}
    
    >
      {
        [...Array(5)].map((item, index) => {
          return (
            <BlurView
            style={{
           
              backgroundColor: '#7674742e',
              borderRadius: 27,
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: Dimensions.get('window').width - 160,
              marginRight: 20,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              maxWidth:'auto',
              alignItems:'flex-start',
              
          
            }}
            >
              <View>
            <Image
            source={{uri:"https://www.rollingstone.com/wp-content/uploads/2023/07/Burna-boy-new-album-big-7-song.jpg"}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100
            }}
            />
              </View>
              <View
              style={{
                flexDirection: 'column',
             
                marginLeft: 10
          
              }}
              >
                <Text
                style={{
                  color: 'white',
                  fontSize: 26,
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
                  fontWeight: '400',
                  marginTop: 5
                }}
                >
                  Burna Boy
                </Text>
                <Text
                style={{
                  color: '#ddd',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 5
                }}
          
                >
                03:45
                </Text>
          
              </View>
            </BlurView>
          )
      })}
    
    </ScrollView>
          </View>
        </View>
        </View>
      </LinearGradient>
    )
}