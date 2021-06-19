import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
//Redux stuff
import { connect } from 'react-redux'
import { getScream } from '../../redux/actions/dataActions'
import { submitComment } from '../../redux/actions/dataActions'
import { ErrorSharp } from '@material-ui/icons'
const styles = (theme) => ({
	invisibleSeparator: {
		border: 'none',
		margin: 4,
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid rgba(0,0,0,0.1)',
		marginBottom: 20,
	},
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover',
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
	},
	expandButton: {
		position: 'absolute',
		left: '95%',
	},
	spinnerDiv: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50,
	},
	submit: {
		display: 'flex',
	},
	button: {
		marginLeft: 10,
	},
})

class CommentForm extends Component {
	state = {
		body: '',
		errors: {},
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors })
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '' })
		}
	}
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.submitComment(this.props.screamId, { body: this.state.body })
	}
	render() {
		const { classes, authenticated } = this.props
		const errors = this.state.errors
		const commentFormMarkup = authenticated ? (
			<Grid item sm={12} styles={{ textAlign: 'center' }}>
				<form onSubmit={this.handleSubmit} className={classes.submit}>
					<TextField
						name='body'
						type='text'
						label='Comment on scream'
						helperText={errors.comment}
						value={this.state.body}
						onChange={this.handleChange}
						fullWidth
						className={classes.textField}
						required
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.button}
					>
						Submit
					</Button>
				</form>
			</Grid>
		) : null
		return commentFormMarkup
	}
}

CommentForm.propTypes = {
	submitComment: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { submitComment })(
	withStyles(styles)(CommentForm)
)
