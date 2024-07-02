import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { NumberContainer } from '@/components/game/NumberContainer';
import { Card } from '@/components/ui/Card';
import { InstructionText } from '@/components/ui/InstructionText';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Title } from '@/components/ui/Title';
import { NumberContext } from '@/contexts/NumberProvider';
import { GuessLogItem } from '@/components/game/GuessLogItem';

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  if(randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude) 
  } 

  return randomNumber;
}

let minBoundary = 1;
let maxBoundary = 100

export default function GameScreen() {
  const { number, addGuessedNumber, guessRecords } = useContext(NumberContext)
  const initialNumber = generateRandomBetween(1, 100, number)
  const [currentGuess, setCurrentGuess] = useState(initialNumber)

  useEffect(() => {
    addGuessedNumber(initialNumber)
  }, [])

  useEffect(() => {
    if(currentGuess === number) {
      router.push('/gameOver')
    }
  }, [currentGuess, number])

  const nextGuessHandler = (direction: 'lower' | 'greater') => {
    if((direction === 'lower' && currentGuess < number) || (direction === 'greater' && currentGuess > number)){
      Alert.alert("Don't lie!", " You now that this is wrong...", [
        { text: 'Sorry!', style: 'cancel'}
      ])
      return;
    }


    if (direction === 'lower'){
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRndNumber)
    addGuessedNumber(newRndNumber)
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('lower')}>
              <Ionicons name='remove' size={24} color='white'/>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler('greater')}>
              <Ionicons name='add' size={24} color='white'/>
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList 
          data={guessRecords} 
          renderItem={(itemData) => <GuessLogItem roundNumber={itemData.index} guess={itemData.item}/>}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
})

