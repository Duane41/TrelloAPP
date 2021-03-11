
import React, { Component } from 'react';
import { Button, Dialog } from "@blueprintjs/core";
import './Card.css';

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_do: [],
            modal_open: false,
            card_name: ""
        };
    }

    launchModal = () => {
        this.setState({ modal_open: true })
    }
    closeModal = () => {
        this.setState({ modal_open: false })
    }
    createCard = () => {
        fetch('/api/createCard?name=' + this.state.card_name + '&list_id=' + this.props.list_id)
        .then(res => res.json())
        .then(results => {
            if (results.success) {
                window.location.reload(false);
            }
        })
        .catch(error => {
            console.error(error)
        })
        this.setState({ modal_open: false })
    }
    handleCardNameChange = (event) => {
        this.setState({card_name: event.target.value});
    }
    render() {
        return (
            <div className="PopUp">
                <Button intent="success" text="Add" onClick={this.launchModal} className="CardBtn" />
                <Dialog
                    icon="info-sign"
                    onClose={this.closeModal}
                    title={"Add Card"}
                    isOpen={this.state.modal_open}
                    {...this.state}
                    style={{ width: '500px', marginTop: '10px', fontSize: "16px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    Please provide a name for this card
                    <input type="text" placeholder="Card Name" className="CardNameInput" value={this.state.card_name} onChange={this.handleCardNameChange}/>
                            <Button style={{ width: '100px', backgroundColor: 'rgb(0, 176, 178)', margin: '10px', marginBottom: '0px' }} text={"Confirm"} onClick={() => {
                        this.createCard();
                    }} />
                    <Button style={{ width: '100px', backgroundColor: 'rgb(251, 38, 91)', margin: '10px', marginBottom: '0px' }} text="Cancel" onClick={() => {
                        this.closeModal();
                    }} />
                </Dialog>
            </div>
        )
    }

}

export default PopUp;
