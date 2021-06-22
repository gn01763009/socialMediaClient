import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import BadgeAvatar from '../../util/BadgeAvatar'
// MUI
import { Avatar, Typography, TextField, Button, Grid } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
//Redux stuff
import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'
const styles = (theme) => ({
	commentForm: {
		marginTop: 20,
	},
	button: {
		marginLeft: 10,
		display: 'none',
	},
	//comment bar
	submit: {
		display: 'flex',
		width: '90%',
	},
	comment: {
		position: 'relative',
		borderRadius: '20px',
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		marginTop: 5,
	},
	inputRoot: {
		color: 'inherit',
		padding: theme.spacing(1),
		paddingRight: theme.spacing(3),
		width: '100%',
	},
	inputInput: {
		position: 'relative',
		padding: '4px 0',
		// vertical padding + font size from searchIcon
		paddingLeft: theme.spacing(2),
		transition: theme.transitions.create('width'),
		width: '100%',
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
		const {
			classes,
			authenticated,
			user: {
				credentials: { imageUrl },
			},
		} = this.props
		const errors = this.state.errors
		const commentFormMarkup = authenticated ? (
			<Grid
				item
				sm={12}
				container
				direction='row'
				justify='flex-start'
				alignItems='flex-start'
				styles={{ textAlign: 'center' }}
				className={classes.commentForm}
			>
				<BadgeAvatar imageUrl={imageUrl} authenticated={authenticated} />
				<form onSubmit={this.handleSubmit} className={classes.submit}>
					{/* <TextField
						name='body'
						type='text'
						label='Comment on scream'
						helperText={errors.comment}
						value={this.state.body}
						onChange={this.handleChange}
						fullWidth
						className={classes.textField}
					/> */}
					<div className={classes.comment}>
						<InputBase
							placeholder='Write a comment.....'
							name='body'
							fullWidth
							onChange={this.handleChange}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							value={this.state.body}
							inputProps={{ 'aria-label': 'input' }}
						/>
					</div>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.button}
					></Button>
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
	user: state.user,
})

export default connect(mapStateToProps, { submitComment })(
	withStyles(styles)(CommentForm)
)
