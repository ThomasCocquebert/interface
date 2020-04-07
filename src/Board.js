import React from "react";
import Square from "./Square";

export default class Board extends React.Component{

    renderSquare(i){
        return(
            <Square
                onClick = {()=>this.props.onClick(i)}
                value = {this.props.tabPlateau[i]}
            />
        );
    }

    render(){

        const board = [];

        for(let i=0;i<10;i++){
            const board_row = [];
            for(let j=0;j<10;j++)
            {
                board_row.push(this.renderSquare(i*10+j));
            }
            board.push(<div className="board_row">{board_row}</div> )
        }

        return(
            <div>
                {board}
            </div>
        );

    }
}