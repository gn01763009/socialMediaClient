import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import NavBarButton from '../../util/NavBarButton'
// MUI stuff
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import { red, green, yellow } from '@material-ui/core/colors'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import UserBarBtn from '../../util/UserBarBtn'
import { Avatar, Typography, Button, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// Icon
import CloseIcon from '@material-ui/icons/Close'
import VideoCallIcon from '@material-ui/icons/VideoCall'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined'
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
	//PostBar
	' .PostBar-handleBar-192': {
		margin: 0,
	},
	card: {
		backgroundColor: theme.palette.primary.main,
		borderRadius: 10,
		margin: '0 0 20px 0',
		padding: '0 0 10px 0',
	},
	postBarTop: {
		[theme.breakpoints.up('xs')]: {
			display: 'flex',
			alignItems: 'center',
			padding: '0 0 10px 0',
			borderBottom: `1px solid ${theme.palette.primary.light}`,
			backgroundColor: theme.palette.primary.main,
		},
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	postBarTopcreate: {
		[theme.breakpoints.up('xs')]: {
			width: '100%',
			justifyContent: 'flex-start',
		},
	},
	postBarInput: {
		[theme.breakpoints.up('xs')]: {
			padding: '0 0 0 10px',
			color: theme.palette.primary.contrasText,
		},
	},
	content: {
		padding: '10px 16px 5px 14px',
	},
	postBarButtonContainer: {
		[theme.breakpoints.up('xs')]: {
			flexWrap: 'initial',
			'& .MuiButtonBase-root': {
				padding: '4px 15px 2px 15px',
			},
		},
	},
	postBarButtonTy: {
		textTransform: 'capitalize',
		padding: '0 15px 0 5px',
	},
})

class PostBar extends Component {
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
				<Card className={classes.card}>
					<CardContent className={classes.content}>
						<div className={classes.postBarTop}>
							<Link to={`/users/${handle}`}>
								<Avatar src={imageUrl} className={classes.large}></Avatar>
							</Link>
							<Grid item xs={12}>
								<UserBarBtn
									btnClassName={classes.postBarTopcreate}
									onClick={this.handleOpen}
									tip='Create Post'
								>
									<Typography variant='body1' className={classes.postBarInput}>
										What's on your mind, {handle}?
									</Typography>
								</UserBarBtn>
							</Grid>
						</div>
					</CardContent>
					<Grid
						className={classes.postBarButtonContainer}
						container
						direction='row'
						justify='center'
						alignItems='center'
					>
						<NavBarButton tip='Gorups' tipClassName={classes.postBarTopButton}>
							<VideoCallIcon
								color='primary'
								style={{ fontSize: 30, color: red[800] }}
							/>
							<Typography
								variant='subtitle1'
								className={classes.postBarButtonTy}
							>
								Live Video
							</Typography>
						</NavBarButton>
						<NavBarButton tip='Gorups' tipClassName={classes.postBarTopButton}>
							<PhotoLibraryIcon
								color='primary'
								style={{ fontSize: 30, color: green[800] }}
							/>
							<Typography
								variant='subtitle1'
								className={classes.postBarButtonTy}
							>
								Photo/Video
							</Typography>
						</NavBarButton>
						<NavBarButton tip='Gorups' tipClassName={classes.postBarTopButton}>
							<EmojiEmotionsOutlinedIcon
								style={{ fontSize: 30, color: yellow[800] }}
							/>
							<Typography
								variant='subtitle1'
								className={classes.postBarButtonTy}
							>
								Feeling/Activity
							</Typography>
						</NavBarButton>
					</Grid>
				</Card>
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

PostBar.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
})

export default connect(mapStateToProps, { postScream, clearErrors })(
	withStyles(styles)(PostBar)
)
