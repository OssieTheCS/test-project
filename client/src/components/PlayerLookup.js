import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Button, TextField, makeStyles, InputBase, Divider, IconButton} from '@material-ui/core';
import SearchIcon  from '@material-ui/icons/Search' 

const axios = require('axios').default;

const playerOpsTable = [
  {
    field: 'sender',
    headerName: 'Player',
    width: 150,
    editable: false,
  },
  {
    field: 'tx_type',
    headerName: 'Type',
    width: 150,
    editable: false,
  },
  {
    field: 'tx_id',
    headerName: 'Transaction id',
    type: 'number',
    width: 170,
    editable: false,
  },
  {
    field: 'block_num',
    headerName: 'Block',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'block_time',
    headerName: 'Timestamp',
    type: 'number',
    width: 200,
    editable: false,
  },
];

class PlayerLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayer: "",
      activePlayerTxs: [],
      playerLookedUp: false
    };
    this.updateActivePlayer = this.updateActivePlayer.bind(this)
    this.loadPlayerTransactions = this.loadPlayerTransactions.bind(this)
  }

  updateActivePlayer(event) {
    this.setState({activePlayer: event.target.value});
    this.loadPlayerTransactions(event)
  }

  loadPlayerTransactions(event) {
    axios.get(`http://localhost:4000/players/${event.target.value}`)
    .then(res => {
        console.log(res)
        this.setState({ 
          activePlayerTxs: res.data,
          playerLookedUp: true
        })
        
      }
    );
    event.preventDefault();
  }


  render() {
    return (
      <div className="operation-list">
        <form ref="form" onSubmit={(event) => event.preventDefault() }>
          <TextField  
            id="outlined-basic" 
            value={this.state.activePlayer} 
            onChange={this.updateActivePlayer}
            placeholder="Lookup player"
          />
        <IconButton type="submit" className={'icon-button'} aria-label="search">
          <SearchIcon />
        </IconButton>
        </form>
        {
            <div>
              <h2>Player: {this.state.activePlayer}</h2>
              <div style={{ height: 580, width: 900, background: 'white', display: "inline-table" }}>
                <DataGrid
                  rows={this.state.activePlayerTxs}
                  columns={playerOpsTable}
                  getRowId={(row) => row.tx_id}
                  pageSize={50}
                  checkboxSelection
                  disableSelectionOnClick
                  />
              </div>
            </div>
        }
        {this.state.activePlayerTxs.length == 0  && this.state.playerLookedUp ? <p>No transactions found.</p> : ""}
      </div>
    );
  }
}

export default PlayerLookup;