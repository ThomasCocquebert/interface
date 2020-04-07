import React from "react";
import Bateau from './Bateau'
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export default class Container extends React.Component{

 /*   handleClick(){
        return console.log("bateau click");
    }
*/

    renderSquare(i){
        return(
            <Bateau
                onClick = {() => this.props.onClick(i)}
            />
        );
    }

    render() {

        const tab = []
        for(let i=0;i<5;i++){
            tab.push(<div className="board_row">{this.renderSquare(i)}</div>)
        }

        return(
            <div className={"bateaux"}>
                <div className={"all"}>
                    {tab}
                </div>

                <div className={"boutons"}>
                    <RadioGroup onChange={this.props.position}>
                        <RadioButton value={"vertical"}>
                            vertical
                        </RadioButton>
                        <RadioButton value={"horizontal"}>
                            horizontal
                        </RadioButton>
                    </RadioGroup>
                </div>
            </div>
        );
    }
}