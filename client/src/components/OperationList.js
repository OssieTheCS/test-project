import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { DataGrid } from '@material-ui/data-grid';
import {Button, Fab} from '@material-ui/core';

const axios = require('axios').default;

const playerOpsTable = [
  {
    field: 'player',
    headerName: 'Player',
    width: 200,
    editable: false,
  },
  {
    field: 'count',
    headerName: 'Count',
    width: 120,
    editable: false,
  },
];

const operationsTable = [
  {
    field: 'tx_type',
    headerName: 'Transaction type',
    width: 200,
    editable: false,
  },
  {
    field: 'count',
    headerName: 'Count',
    width: 120,
    editable: false,
  },
];

class OperationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      opCount: [],
      payerOpsCount: []
    };
    this.refreshOperations = this.refreshOperations.bind(this)
  }

  refreshOperations(){
    axios.get('http://localhost:4000/')
      .then(res => {
          console.log(res)

          // Group by tx_type and count it, i.e [tx_type, count]
          const opsCountMap = res.data.reduce((acc, op) => 
            (acc[op.tx_type] = ++acc[op.tx_type] || 1, acc), {}
          )

          // Group by sender and count it, i.e [player, count]
          const playerOpsCountMap2 = res.data.reduce((acc, op) => 
            (acc[op.sender] = ++acc[op.sender] || 1, acc), {}
          )

          // Convert maps to json objects and update states.
          this.setState({ 
            operations: res.data,
            opCount: Object.keys(opsCountMap).map(k => {return {'tx_type': k, 'count': opsCountMap[k]} }),
            payerOpsCount: Object.keys(playerOpsCountMap2).map(k => {return {'player': k, 'count': playerOpsCountMap2[k]} }),
          })
          
        }
      );
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Button color="primary" variant="outlined" onClick={this.refreshOperations}>Refresh now</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h2>Operations</h2>
            <div style={{ height: 580, width: '100%', background: 'white', display: "inline-table" }}>
              <DataGrid
                rows={this.state.opCount}
                columns={operationsTable}
                getRowId={() => Math.random()}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                />
            </div>
          </Col>
          <Col xs={6}>
            <h2>Players</h2>
            <div style={{ height: 580, width: '100%', background: 'white', display: "inline-table" }}>
              <DataGrid
                rows={this.state.payerOpsCount}
                columns={playerOpsTable}
                getRowId={() => Math.random()}
                pageSize={50}
                checkboxSelection
                disableSelectionOnClick
                />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OperationList;