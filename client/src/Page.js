
import './App.css';
import React, { Component } from 'react';
import Card from "./Card.js";
import { Spinner } from "@blueprintjs/core";


class Page extends Component {
    constructor() {
        super();
        this.state = {
            to_do: [],
            loading: true
        };
    }

    componentDidMount = () => {
        fetch('/api/getToDo')
        .then(res => res.json())
        .then(results => {
            this.setState({ to_do: results, loading: false})
        })
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        if (this.state.loading) {
            return(<div className="PageLoading">
                <Spinner size={80}/>
            </div>);
        }
        return (
            <div className="Page">
                {this.state.to_do.map((item) => {
                    return <Card list_id={item.list_id} list_name={item.list_name} list_items={item.cards}/>
                })}
            </div>
          )
    }
  
}

export default Page;
