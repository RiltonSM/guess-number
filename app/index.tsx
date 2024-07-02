import PrimaryButton from '@/components/ui/PrimaryButton';
import { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import { router } from 'expo-router'
import { NumberContext } from '@/contexts/NumberProvider';
import Colors from '@/constants/colors';
import { Title } from '@/components/ui/Title';
import { InstructionText } from '@/components/ui/InstructionText';

export default function StartGameScreen() {
  const [enteredNumber, setEnteredNumber] = useState('');
  const { changeNumber } = useContext(NumberContext)
  
  const numberInputHandler = (enteredText: string) => {
    setEnteredNumber(enteredText)
  }

  const resetInputHandler = () => {
    setEnteredNumber('')
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber)

    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert(
        'Invalid number!', 
        'Number has to be a number between 1 and 99', 
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }
    changeNumber(chosenNumber)
    router.push('/game')
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <View style={styles.inputContainer}>
        <InstructionText>Enter a number</InstructionText>
        <TextInput 
          style={styles.input} 
          maxLength={2} 
          keyboardType='number-pad' 
          autoCapitalize='none' 
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 2, 
    },
    shadowRadius: 6,
    shadowOpacity: 0.25
  },
  input: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1
  }
});