import React from "react"
import Die from "./Die.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    let currentTime = new Date()
    const [startTime, setStartTime] = React.useState(0)
    const [endTime, setEndTime] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(count==0){setStartTime(currentTime.getMinutes()*60+currentTime.getSeconds())}
        if(!tenzies) {
            setCount(prevCount => ++prevCount)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setEndTime(currentTime.getMinutes()*60+currentTime.getSeconds())
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setCount(0)

        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {value: die.value, id: die.id, isHeld: !die.isHeld} :
                die
        }))
    }

    function luckMessage(count){
        if(count<=10 && count>=1){
            return (
                <div className="luck">Looks like you have an incredible luck 😮</div>
            )
        }
        else if(count>=20){
            return(
                <div className="luck">Looks like you are not a lucky person 😬</div>
            )
        }
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies && <div className="roll--count">Your time:  {endTime - startTime} sec</div>}
            {tenzies && <div className="roll--count">Your roll count: {count}</div>}
            {tenzies && luckMessage(count)}
        </main>
    )
}