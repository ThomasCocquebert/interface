
import React from "react";
import Board from "./Board";
import BoardOpponent from "./BoardOpponent";
import Container from "./Container";

export default class Game extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tabBateau:Array(5).fill(null),
            tabPlateau:Array(100).fill(null),
            tabOpponent: Array(100).fill(null),
            remainBoat:Array(5).fill(null),
            position: null,
        }
    }

    // fonction quel bateau pour handle click V
    //une fonction suivant le bateau combien de cases

    whichBoat(i){
        let position=-1;
        for(let cpt=0;cpt<5;cpt++){
            if(this.state.tabBateau[cpt] === 1){
                position = cpt
            }
        }
        console.log("position = " + position);
        return position;
    }

    caseNumber(i){
        /*
        if(i===0)
            return 5;
        if(i===1)
            return 4;
         */
        let ret = -1;
        switch(i) {
            case 0:
                ret = 5;
                break;

            case 1:
                ret = 4;
                break;

            case 2:
                ret = 3;
                break;

            case 3:
                ret = 3;
                break;

            case 4:
                ret = 2;
                break;

            default:
                console.log("Error with boat " + i);
                console.log("Boat with 0 value");
                ret = 0;
        }
        return ret;
    }

    isBoatFit(i,caseNumber){
        /*
        console.log("i = " + i);
        let casePressee = i;
        //si le bateau est placee verticalement
        if(this.state.position === "vertical"){
            //si le bateau rentre verticalement sans parle de voisin ou de superpsition
            if((caseNumber-1)*10+i<100){
              //si il n'est sur la premiere ligne
              if(casePressee > 9){
                 //on check si un bateau est au dessus
                if(this.state.tabPlateau[casePressee-10] === 'X')
                    return false;
              }
             //on regrde pour chaque case du bateau
             for(let cpt=0;cpt<caseNumber;cpt++){
                 //Si un bateau est deja sur la meme case ce n'est pas possible
                 if(this.state.tabPlateau[casePressee]==='X') {
                     return false;
                 }
                 //Si le bateau n'est pas sur un bord cote gauche il faut check si il n'est pas a cote d'un autre
                 if(casePressee !== 0 && casePressee !== 10 && casePressee !== 20 && casePressee !== 30 && casePressee !== 40 && casePressee !== 50 && casePressee !== 60 && casePressee !== 70 && casePressee !== 80 && casePressee !== 90)
                 {
                    if(this.state.tabPlateau[casePressee-1]==='X') {
                        console.log("je bloque a cause de gauche");
                        return false;
                    }
                 }
                 //Pareil pour le cote droit
                 if(casePressee !== 9 && casePressee !== 19 && casePressee !== 29 && casePressee !== 39 && casePressee !== 49 && casePressee !== 59 && casePressee !== 69 && casePressee !== 79 && casePressee !== 89 && casePressee !== 99)
                 {
                     if(this.state.tabPlateau[casePressee+1]==='X')
                         return false;
                 }

                 //il faut actualiser casePresse pour chec celle d'apres
                 casePressee += 10;
             }
            }
            else{
                return false;
            }
        }
        return true;

         */
        let numCase = i;
        if(this.state.position === "vertical") {
            if((caseNumber-1)*10+numCase < 100) {
                for (let j = 0; j < caseNumber; j++) {
                    if (this.state.tabPlateau[numCase + (10 * j)] === "X") {
                        console.log("Not enough space");
                        return false
                    }
                }
            } else {
                console.log("Not enough height");
                return false;
            }
        } else if(this.state.position === 'horizontal') {
            console.log("Test for Horizontal case");
            if (this.checkSameLine(numCase, caseNumber)) {
                for (let j = 0; j < caseNumber; j++) {
                    if (this.state.tabPlateau[numCase + j] === "X") {
                        return false
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    handleClickPlateau(i){
        console.log(i);


        if(this.whichBoat(i) !== -1){
            let caseNumber = this.caseNumber(this.whichBoat(i));
            if (!this.isOccupied(caseNumber)) {
                return false;
            }
            if(this.isBoatFit(i,caseNumber)) {
                console.log("bateau deja clique est true");
                const tabPlateauSlice = this.state.tabPlateau.slice();
                if (this.state.position === "vertical") {
                    for (let k = 0; k < caseNumber; k++) {
                        tabPlateauSlice[k*10+i] = 'X';
                    }
                    this.setState({tabPlateau: tabPlateauSlice});
                    this.fillReamainBoatVertical(caseNumber, i);
                } else {
                    for (let k = 0; k < caseNumber; k++) {
                        tabPlateauSlice[k+i] = 'X';
                    }
                    this.setState({tabPlateau: tabPlateauSlice});
                    this.fillReamainBoatHorizontal(caseNumber, i);
                }
                /*for(let k=0;k<caseNumber;k++) {
                    tabPlateauSlice[k*10+i] = 'X';
                }
                this.setState({tabPlateau: tabPlateauSlice})
                 */
            }
        }
        else{
            console.log("bateau deja clique est false");
        }
        console.log(this.state.remainBoat);
    }

    handleClickBateau(i){
       /* if(i===0)
            return (console.log("je suis le bateau du haut"));
        if(i===1)
            return (console.log("je suis le bateau du bas")); */
         console.log(i);
        const tabBateauSlice = this.state.tabBateau.slice();
       for(let cpt=0;cpt<5;cpt++){
           tabBateauSlice[cpt] = 0;
       }
       tabBateauSlice[i] = 1;

       this.setState({tabBateau:tabBateauSlice})
    }

    handleClickPosition(i){
        if(i==="vertical"){
            console.log("Switch on vertical");
            this.setState({position : "vertical"});
            console.log(this.state.position);
        }
        if(i==="horizontal"){
            console.log("Switch on horizontal");
            this.setState({position : "horizontal"});
            console.log(this.state.position);
        }

    }

    handleClickOpponent(i) {
        const tabOpponentSlice = this.state.tabOpponent.slice();
        if (tabOpponentSlice[i] === null) {
            tabOpponentSlice[i] = "X";
            this.setState({tabOpponent: tabOpponentSlice});
            console.log("Try a shot on case : " + i);
        }
    }

    checkSameLine(initCase, sizeBoat) {
        if ((0 <= initCase) && (initCase <= 9)) {
            if ((0 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 9)) {
                return true;
            }
        } else if ((10 <= initCase) && (initCase <= 19)) {
            if ((10 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 19)) {
                return true;
            }
        } else if ((20 <= initCase) && (initCase <= 29)) {
            if ((20 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 29)) {
                return true;
            }
        } else if ((30 <= initCase) && (initCase <= 39)) {
            if ((30 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 39)) {
                return true;
            }
        } else if ((40 <= initCase) && (initCase <= 49)) {
            if ((40 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 49)) {
                return true;
            }
        } else if ((50 <= initCase) && (initCase <= 59)) {
            if ((50 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 59)) {
                return true;
            }
        } else if ((60 <= initCase) && (initCase <= 69)) {
            if ((60 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 69)) {
                return true;
            }
        } else if ((70 <= initCase) && (initCase <= 79)) {
            if ((70 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 79)) {
                return true;
            }
        } else if ((80 <= initCase) && (initCase <= 89)) {
            if ((80 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 89)) {
                return true;
            }
        } else if ((90 <= initCase) && (initCase <= 99)) {
            if ((90 <= initCase+(sizeBoat-1)) && (initCase+(sizeBoat-1) <= 99)) {
                return true;
            }
        } else {
            return false;
        }
    }

    fillReamainBoatVertical(caseNumber, numCase) {
        let remainBoatSlice = this.state.remainBoat.slice();
        switch (caseNumber) {
            case 5:
                remainBoatSlice[0] = new Array(5).fill(null);
                for (let k = 0; k < caseNumber; k++) {
                    remainBoatSlice[0][k] = k*10+numCase;
                }
                this.setState({remainBoat: remainBoatSlice});
                break;

            case 4:
                remainBoatSlice[1] = new Array(4).fill(null);
                for (let k = 0; k < caseNumber; k++) {
                    remainBoatSlice[1][k] = k*10+numCase;
                }
                this.setState({remainBoat: remainBoatSlice});
                break;

            case 3:
                if(remainBoatSlice[2] === null) {
                    remainBoatSlice[2] = new Array(3).fill(null);
                    for (let k = 0; k < caseNumber; k++) {
                        remainBoatSlice[2][k] = k*10+numCase;
                    }
                    this.setState({remainBoat: remainBoatSlice});
                    break;
                } else {
                    remainBoatSlice[3] = new Array(3).fill(null);
                    for (let k = 0; k < caseNumber; k++) {
                        remainBoatSlice[3][k] = k*10+numCase;
                    }
                    this.setState({remainBoat: remainBoatSlice});
                    break;
                }

            case 2:
                remainBoatSlice[4] = new Array(2).fill(null);
                for (let k = 0; k < caseNumber; k++) {
                    remainBoatSlice[4][k] = k*10+numCase;
                }
                this.setState({remainBoat: remainBoatSlice});
                break;

            default:
                return;
        }
    }

    fillReamainBoatHorizontal(caseNumber, numCase) {
        let remainBoatSlice = this.state.remainBoat.slice();
        switch (caseNumber) {
            case 5:
                remainBoatSlice[0] = new Array(5).fill(null);
                for (let k = 0; k < caseNumber; k++) {
                    remainBoatSlice[0][k] = k+numCase;
                }
                this.setState({remainBoat: remainBoatSlice});
                break;

            case 4:
                remainBoatSlice[1] = new Array(4).fill(null);
                for (let k = 0; k < caseNumber; k++) {
                    remainBoatSlice[1][k] = k+numCase;
                }
                this.setState({remainBoat: remainBoatSlice});
                break;

            case 3:
                if(remainBoatSlice[2] === null) {
                    remainBoatSlice[2] = new Array(3).fill(null);
                    for (let k = 0; k < caseNumber; k++) {
                        remainBoatSlice[2][k] = k+numCase;
                    }
                    this.setState({remainBoat: remainBoatSlice});
                    break;
                } else {
                    remainBoatSlice[3] = new Array(3).fill(null);
                    for (let k = 0; k < caseNumber; k++) {
                        remainBoatSlice[3][k] = k+numCase;
                    }
                    this.setState({remainBoat: remainBoatSlice});
                    break;
                }

            case 2:
                remainBoatSlice[4] = new Array(2).fill(null);
                for (let k = 0; k < caseNumber; k++) {
                    remainBoatSlice[4][k] = k+numCase;
                }
                this.setState({remainBoat: remainBoatSlice});
                break;

            default:
                return;
        }
    }

    isOccupied(caseNumber) {
        switch (caseNumber) {
            case 5:
                if (this.state.remainBoat[0] === null) {
                    return true;
                }
                break;

            case 4:
                if (this.state.remainBoat[1] === null) {
                    return true;
                }
                break;

            case 3:
                if ((this.state.remainBoat[2] === null) || (this.state.remainBoat[3] === null)) {
                    return true;
                }
                break;

            case 2:
                if (this.state.remainBoat[4] === null) {
                    return true
                }
                break;

            default:
                return false
        }
    }

    isFull() {
        let checkBoat = true;
        let cpt = 0;
        while (cpt !== 5 && checkBoat === true) {
            if (this.state.remainBoat[cpt] === null) {
                checkBoat = false;
            }
            cpt++;
        }
        return checkBoat;
    }

    render() {
        if (this.isFull()) {
            return (
                <div className="all">
                    <div className="Game_Board_Reduce">
                        Your Map
                        <Board
                            onClick={(i) => this.handleClickPlateau(i)}
                            tabPlateau={this.state.tabPlateau}
                        />
                    </div>
                    <div className="Game_Board">
                        Opponent Map
                        <BoardOpponent
                            onClick={(i) => this.handleClickOpponent(i)}
                            tabOpponent={this.state.tabOpponent}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="all">
                    <div className="Game_Board">
                        Place the ships on your Map !
                        <Board
                            onClick={(i) => this.handleClickPlateau(i)}
                            tabPlateau={this.state.tabPlateau}
                        />
                    </div>
                    <div className="Game_Container">
                        <Container
                            onClick={(i) => this.handleClickBateau(i)}
                            position={(i) => this.handleClickPosition(i)}
                        />
                    </div>
                    <div className="rules">
                        <p className="rules">
                            Place a ship and its direction on your map
                        </p>
                        <p className="rules">
                            <ul>
                                <li>1st ship : 5 square</li>
                                <li>2nd ship : 4 square</li>
                                <li>3rd and 4th ships : 3 squares</li>
                                <li>5th ship : 2 square</li>
                            </ul>
                        </p>
                        <p>
                            You can't (for now) undo any action, once placed your ships are here forever !
                        </p>
                        <p>
                            Your ships are placed from the left to the right and from the top to the bottom, based on which square you clicked
                        </p>
                        <p>
                            You can place you ships side by side
                        </p>
                    </div>
                </div>
            );
        }
    }
}