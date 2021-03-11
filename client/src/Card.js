
import './Card.css';
import React, { Component } from 'react';
import PopUp from "./PopUp.js"

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_do: [],
            modal_open: false
        };
    }

    launchModal = () => {
        this.setState({ modal_open: true })
    }
    closeModal = () => {
        this.setState({ modal_open: false })
    }
    createCard = () => {
        //api to create card
        this.setState({ modal_open: false })
    }
    render() {
        return (
            <div className="Card">
                <div className="CardHeader">
                    <div className="CardHeaderCell-1">
                        <h2>{this.props.list_name}</h2>
                    </div>
                    <div className="CardHeaderCell-2">
                        <PopUp list_id={this.props.list_id}/>
                    </div>
                </div>
                <div className="CardBody">
                    {this.props.list_items.map((item) => {
                        return (<div className="CardBodyCell">{item.task}</div>);
                    })}
                </div>
            </div>
        )
    }

}

export default Card;
