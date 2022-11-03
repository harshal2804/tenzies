import React from "react"
import one from "./photos/Alea_1-removebg-preview.png"
import two from "./photos/Alea_2-removebg-preview.png"
import three from "./photos/Alea_3-removebg-preview.png"
import four from "./photos/Alea_4-removebg-preview.png"
import five from "./photos/Alea_5-removebg-preview.png"
import six from "./photos/Alea_6-removebg-preview.png"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {props.value===1 && <img src={one} width="50px" height="50px" />}
            {props.value===2 && <img src={two} width="50px" height="50px" />}
            {props.value===3 && <img src={three} width="50px" height="50px" />}
            {props.value===4 && <img src={four} width="50px" height="50px" />}
            {props.value===5 && <img src={five} width="50px" height="50px" />}
            {props.value===6 && <img src={six} width="50px" height="50px" />}
        </div>
    )
}