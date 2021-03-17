import React, { Component } from 'react';

export default class ConsolePhotostocks extends Component {
    static displayName = ConsolePhotostocks.name;

    constructor(props) {
        super(props);
        this.state = { stocks: [], loading: true };
    }

    componentDidMount() {
        this.populateStocksData();
    }

    static renderStocksTable(stocks) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>URL</th>

                    </tr>
                </thead>
                <tbody>
                    {stocks.map(stock =>
                        <tr key={stock.id}>
                            <td>{stock.url}</td>

                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ConsolePhotostocks.renderStocksTable(this.state.stocks);

        return (
            <div>
                <h1 id="tabelLabel" >Photo Stocks</h1>
                {/* <p>This component demonstrates fetching data from the server.</p> */}
                {contents}
            </div>
        );
    }

    async populateStocksData() {
        const response = await fetch('/api/consolephotostocks', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        const data = await response.json();
        this.setState({ stocks: data, loading: false });
    }
}
