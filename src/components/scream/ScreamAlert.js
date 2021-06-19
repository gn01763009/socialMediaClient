import React, { Component, Fragment } from 'react'
// MUI stuff
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
// Icon

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}
class ScreamAlert extends Component {
	state = {
		open: false,
	}
	redner() {
		const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
				return
			}
			this.setState({ open: true })
		}
		return (
			<Snackbar
				open={this.state.open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='success'>
					This is a success message!
				</Alert>
			</Snackbar>
		)
	}
}

export default ScreamAlert
