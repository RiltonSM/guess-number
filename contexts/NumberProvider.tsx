import { createContext, useState } from 'react';

interface NumberContextProps {
    number: number,
    changeNumber: (enteredNumber: number) => void
    reStart: () => void,
    guessRecords: Array<number>,
    addGuessedNumber: (guessedNumber: number) => void
}

export const NumberContext = createContext<NumberContextProps>({
    number: 0,
    changeNumber: () => {},
    reStart: () => {},
    guessRecords: [],
    addGuessedNumber: () => {}
});

interface NumberProviderProps {
    children: React.ReactNode
}

export const NumberProvider = ({ children }: NumberProviderProps) => {
    const [userNumber, setUserNumber] = useState<number>(0)
    const [guessRecords, setGuessRecords] = useState<Array<number>>([]);

    const changeNumber = (enteredNumber: number) => {
        setUserNumber(enteredNumber)
    }

    const reStart = () => {
        setUserNumber(0)
        setGuessRecords([])
    }

    const addGuessedNumber = (guessedNumber: number) => {
        setGuessRecords(oldState => {
            oldState.push(guessedNumber)
            return oldState
        })
    }

    return (
        <NumberContext.Provider value={{
            number: userNumber,
            changeNumber,
            reStart,
            guessRecords,
            addGuessedNumber
        }}>
            {children}
        </NumberContext.Provider>
    )
}