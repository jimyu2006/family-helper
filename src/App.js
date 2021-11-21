import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class App extends Component {
  state = {
    isLoading: false, invoices: []
  };

  remove(id) {
    let updatedInvoices = this.state.invoices.filter(i => i.id !== id);
    this.setState({ invoices: updatedInvoices });
  }

  async componentDidMount() {
    const response = await fetch('https://4uxtr8v4vl.execute-api.us-east-1.amazonaws.com/dev');
    const body=await response.json();

    this.setState({invoices: body, isLoading: false});

  }

  render() {
    const isLoading = this.state.isLoading;
    const allInvoices = this.state.invoices;

    if (isLoading) {
      return (<div>Loading...</div>);
    }

    let invoices = allInvoices.map((invoice) => {
      return <tr key={invoice.id}>
        <td>{invoice.Vendor}</td>
        <td>{invoice.Amount}</td>
        <td>{invoice.Invoice}</td>
        <td>{invoice.Date}</td>
        <td><Button className="btn btn-lg btn-success" onClick={() => this.remove(invoice.id)}>OK</Button> </td>
        <td><Button className="btn btn-lg btn-danger" onClick={() => this.remove(invoice.id)}>NOK</Button> </td>
        <td><Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.id)}>50%</Button> </td>
        <td><Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoice.id)}>??</Button> </td>
        <td><Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoice.id)}>Image</Button> </td>
      </tr>
    })

    return (
      <div>
        <div className="container border rounded center">
          <div className="row">
            <div className="col-12">
              <h4>Pending Invoices</h4>
            </div>
          </div>
          <div className="row">
            <div className=".col-xs-12 center text-center">
              <Table responsive striped bordered hover>
                <thead>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th colSpan="4" >Actions</th>
                </thead>
                <tbody>
                  {this.state.invoices.length === 0 ? <td colSpan="9">All cauth up! </td> : invoices}
                </tbody>

              </Table>

            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default App;