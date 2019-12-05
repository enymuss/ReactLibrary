import React, { Component } from 'react';

export class CounterCopy extends Component {
    displayName = CounterCopy.name

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
    }


    render() {
        return (
            <div>
               <p>CounterCopy</p>
            </div>
        );
    }
}
