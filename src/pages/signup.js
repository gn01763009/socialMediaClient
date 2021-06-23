import React, { Component } from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import theme from '../theme'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import { blue, green, red } from '@material-ui/core/colors'

// Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userAction'
const ValidationTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: theme.palette.primary.contrastText,
		},
		'& label ': {
			color: theme.palette.primary.contrastText,
		},
		'& input': {
			color: theme.palette.primary.contrastText,
			borderColor: theme.palette.primary.dark,
			borderWidth: 2,
		},
		'& input:valid + fieldset': {
			borderColor: blue[500],
			borderWidth: 2,
		},
		'& input:invalid + fieldset': {
			borderColor: 'red',
			borderWidth: 2,
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			padding: '4px !important', // override inline-style
		},
	},
})(TextField)

const styles = {
	paper: {
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: theme.palette.primary.light,
		padding: 30,
		borderRadius: 10,
		color: theme.palette.primary.contrastText,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		color: theme.palette.common.white,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: blue[500],
		'&:hover': {
			backgroundColor: blue[400],
		},
		'&:active': {
			backgroundColor: blue[200],
		},
		'&:disabled': {
			backgroundColor: blue[100],
		},
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
	},
	button: {
		position: 'relative',
	},
	progress: {
		position: 'absolute',
		color: blue[200],
	},
	signIn: {
		color: theme.palette.primary.contrastText,
	},
}

class signup extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			errors: {},
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors })
		}
	}
	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
			loading: true,
		})
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		}
		this.props.signupUser(newUserData, this.props.history)
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props
		const { errors } = this.state
		return (
			<Container component='main' maxWidth='sm'>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={this.handleSubmit}
					>
						<ValidationTextField
							variant='outlined'
							margin='normal'
							autoFocus
							id='email'
							name='email'
							type='email'
							label='Email Address'
							helperText={errors.email}
							error={
								errors.email
									? true
									: false || errors.general === 'User not found'
									? true
									: false
							}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<ValidationTextField
							variant='outlined'
							margin='normal'
							autoComplete='current-password'
							id='password'
							style={{ color: '#fff' }}
							name='password'
							label='Password'
							type='password'
							helperText={errors.password}
							error={
								errors.password
									? true
									: false || errors.general === 'Wrong password'
									? true
									: false
							}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						<ValidationTextField
							variant='outlined'
							margin='normal'
							autoComplete='current-password'
							id='confirmPassword'
							name='confirmPassword'
							label='confirmPassword'
							type='password'
							helperText={errors.confirmPassword}
							error={
								errors.confirmPassword
									? true
									: false || errors.general === 'Wrong password'
									? true
									: false
							}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>
						<ValidationTextField
							variant='outlined'
							margin='normal'
							id='handle'
							name='handle'
							label='handle'
							type='text'
							helperText={errors.handle}
							error={errors.handle ? true : false}
							value={this.state.handle}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant='body2' className={classes.customError}>
								{errors.general}
							</Typography>
						)}
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							disabled={loading}
						>
							Sign up
							{loading && <CircularProgress className={classes.progress} />}
						</Button>
						<Grid container>
							<Grid item>
								<Link to='/signin' variant='body1' className={classes.signIn}>
									Already have an account? Sign In
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}></Box>
			</Container>
		)
	}
}

signup.propTypes = {
	classes: propTypes.object.isRequired,
	user: propTypes.object.isRequired,
	UI: propTypes.object.isRequired,
	signupUser: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
})
export default connect(mapStateToProps, { signupUser })(
	withStyles(styles)(signup)
)
