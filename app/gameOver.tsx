import PrimaryButton from '@/components/ui/PrimaryButton';
import { Title } from '@/components/ui/Title';
import Colors from '@/constants/colors';
import { NumberContext } from '@/contexts/NumberProvider';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Image, StyleSheet, View, Text, useWindowDimensions, ScrollView } from 'react-native';

export default function GameOverScreen() {
  const { number, reStart, guessRecords } = useContext(NumberContext)

  const { height, width } = useWindowDimensions()

  let imageSize = 300;

  if (width < 380){
    imageSize = 150
  }

  if (height < 400){
    imageSize = 80
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  const onReStartGame = () => {
    reStart()
    
    router.navigate('/')
  }
  
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image 
            style={styles.image}
            source={require('@/assets/images/success.png')}
          />
        </View>

        <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{guessRecords.length}</Text> rounds to guess the number <Text style={styles.highlight}>{number}</Text></Text>

        <PrimaryButton onPress={onReStartGame}>Start new game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
});