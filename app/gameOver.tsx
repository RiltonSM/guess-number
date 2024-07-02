import PrimaryButton from '@/components/ui/PrimaryButton';
import { Title } from '@/components/ui/Title';
import Colors from '@/constants/colors';
import { NumberContext } from '@/contexts/NumberProvider';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

export default function GameOverScreen() {
  const { number, reStart, guessRecords } = useContext(NumberContext)

  const onReStartGame = () => {
    reStart()
    
    router.navigate('/')
  }
  
  return (
    <View style={styles.container}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={require('@/assets/images/success.png')}
        />
      </View>

      <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{guessRecords.length}</Text> rounds to guess the number <Text style={styles.highlight}>{number}</Text></Text>

      <PrimaryButton onPress={onReStartGame}>Start new game</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
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