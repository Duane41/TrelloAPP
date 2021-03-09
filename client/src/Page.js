
import './App.css';
import React, { Component } from 'react';



class Page extends Component {
    constructor() {
        super();
        this.state = {
            to_do: []
        };
    }

    componentDidMount = () => {
        console.log("Mounted")
        fetch('/api/getToDo')
        .then(res => res.json())
        .then(results => {
            console.log(results)
            this.setState({ to_do: results })
        })
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <div>
                <h2>Yo</h2>
            </div>
          )
    }
  
}

export default Page;
