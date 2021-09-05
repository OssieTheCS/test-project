const config = require('./config');
const { Hive } = require('@splinterlands/hive-interface');
const cors = require('cors')
const express = require('express')
const app = express()
const port = 4000
const hive = new Hive();
const operations = []

app.use(cors())
app.get('/', (req, res) => {
	res.send(operations)
})

app.get(`/players/:playerName`, (req, res) => {
	playerOps = operations.filter(op => op.sender == req.params.playerName)
	res.send(playerOps)
})


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

  
hive.stream({ 
	on_op: onOperation,
	save_state: () => null,
	load_state: () => null
});

function onOperation(op, block_num, block_id, previous, transaction_id, block_time) {
	// Filter out any operations not related to Splinterlands
	if(op[0] != 'custom_json' || !op[1].id.startsWith(config.operation_prefix))
		return;

	console.log(`Tx by: ${getTxSender(op)}`)
	console.log(`Received operation: ${JSON.stringify(op)}`);
	parseOperation(op, block_time, block_num, transaction_id)
}

function parseOperation(op, block_time, block_num, transaction_id){
	sender = getTxSender(op)
	tx_type = op[1].id
	operations.push({
		'sender': sender,
		'tx_type': tx_type,
		'block_time': block_time,
		'block_num': block_num,
		'tx_id': transaction_id
	})
}

function getTxSender(op) {
	// Assume each tx requires either posting or active key
	if(op[1].required_auths.length > 0)
		return op[1].required_auths.length[0]
	else
		return op[1].required_posting_auths[0]
}
