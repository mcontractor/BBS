const socket = io()
let state = {}

let gameID = 0

const setState = updates => {
	Object.assign(state, updates)
	ReactDOM.render(React.createElement(Root, state), document.getElementById('root'))
}

socket.on('to_client', data => setState({message: data}))

socket.on('validMove', data => changeButtonVal(data))

socket.on('invalidMove', data => setState({message: data}))

socket.on('boardID', data => gameID = data)

const handleSubmit = ev => {
	ev.preventDefault()
	socket.emit('to_server', state.message)
	setState({message: ''})
}

const clickHandler = (rowNo, colNo) => {
	socket.emit('click_event', [rowNo, colNo, gameID])
}

const changeButtonVal = gameBoard => {
	setState({board: gameBoard})
}

const Root = ({message, numSockets, board}) => {

	return React.createElement('div', null,
		'REVERSI', 
		board.map((row, rowNo) => React.createElement('div', null, 
			row.map((el, colNo) => React.createElement('button', {style: {width: 50, height: 50}, onClick: () => clickHandler(rowNo, colNo)}, el)))),
		message)
}

setState({message: '', numSockets: 0, board: [['-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-'],
	['-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', 'O', 'X', '-', '-', '-'], ['-', '-', '-', 'X', 'O', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-'], 
	['-', '-', '-', '-', '-', '-', '-', '-'], ['-', '-', '-', '-', '-', '-', '-', '-']]})