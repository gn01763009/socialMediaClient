import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
// MUI stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import UserBarBtn from '../../util/UserBarBtn'
import { Avatar } from '@material-ui/core'
// Icon
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
// Redux
import { connect } from 'react-redux'
import { postScream, clearErrors } from '../../redux/actions/dataActions'
import theme from '../../theme'
import { Link } from 'react-router-dom'
const styles = (theme) => ({
	dialog: {
		'& .MuiDialog-paperScrollPaper': {
			backgroundColor: theme.palette.primary.main,
			border: `1px solid ${theme.palette.primary.light}`,
			borderRadius: '10px',
		},
	},
	title: {
		display: 'flex',
		justifyContent: 'center',
		borderBottom: `1px solid ${theme.palette.primary.light}`,
		color: '#fff',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	handleBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: theme.spacing(1),
		'& .MuiButtonBase-root': {
			padding: '0 5px',
			borderRadius: '99em',
			textTransform: 'capitalize',
		},
		small: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
	},
	handleName: {
		fontSize: '14px',
		color: '#fff',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		color: '#fff',
	},
	TextField: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(4),
		content: 'none',
		'& .MuiInputBase-input': {
			fontSize: 22,
			color: theme.palette.primary.contrasText,
			'&:before': {
				content: 'none',
			},
		},
	},
	progressSpinner: {
		position: 'absolute',
	},

	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	button: {
		position: 'relative',
		float: 'right',
	},
	submitButton: {
		position: 'relative',
		width: '-webkit-fill-available',
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
		'&:hover': {
			backgroundColor: 'rgb(74, 135, 247)',
		},
	},
})

class PostScream extends Component {
	state = {
		open: false,
		body: '',
		errors: {},
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors,
			})
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '', open: false, errors: {} })
		}
	}

	handleOpen = () => {
		this.setState({ open: true })
	}
	handleClose = () => {
		this.props.clearErrors()
		this.setState({ open: false, errors: {} })
	}
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.postScream({ body: this.state.body })
	}
	render() {
		const { errors } = this.state
		const {
			classes,
			UI: { loading },
			user: {
				credentials: { handle, imageUrl },
			},
		} = this.props
		return (
			<Fragment>
				<UserBarBtn onClick={this.handleOpen} tip='Create Post'>
					<AddIcon style={{ fontSize: 24 }} />
				</UserBarBtn>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					className={classes.dialog}
					maxWidth='sm'
					backgroundColor={theme.palette.primary.main}
				>
					<DialogTitle className={classes.title}>
						Create Post
						<UserBarBtn
							tip='Close'
							onClick={this.handleClose}
							btnClassName={classes.closeButton}
						>
							<CloseIcon />
						</UserBarBtn>
					</DialogTitle>
					<div className={classes.handleBar}>
						<Link to={`/users/${handle}`}>
							<Button disableRipple className={classes.handleButton}>
								<Avatar src={imageUrl} className={classes.small}></Avatar>
								<div className={classes.handleName}>{handle}</div>
							</Button>
						</Link>
					</div>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name='body'
								type='text'
								required
								multiline
								rows={5}
								placeholder={`Our community always welcome you! ${handle}.`}
								error={errors.body ? true : false}
								helperText={errors.body}
								className={classes.TextField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button
								type='submit'
								variant='contained'
								className={classes.submitButton}
								disabled={loading && this.handleChange ? true : false}
							>
								Post
								{loading && (
									<CircularProgress
										size={30}
										className={classes.progressSpinner}
									/>
								)}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		)
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
})

export default connect(mapStateToProps, { postScream, clearErrors })(
	withStyles(styles)(PostScream)
)
