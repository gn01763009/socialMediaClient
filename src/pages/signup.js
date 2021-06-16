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
import { Copyright } from './signin'

// Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userAction'
const styles = {
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
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
			<Container component='main' maxWidth='xs'>
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
						<TextField
							variant='outlined'
							margin='normal'
							autoFocus
							required
							id='email'
							name='email'
							type='email'
							label='Email Address'
							className={classes.TextField}
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
						<TextField
							variant='outlined'
							margin='normal'
							autoComplete='current-password'
							required
							id='password'
							name='password'
							label='Password'
							type='password'
							className={classes.TextField}
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
						<TextField
							variant='outlined'
							margin='normal'
							autoComplete='current-password'
							required
							id='confirmPassword'
							name='confirmPassword'
							label='confirmPassword'
							type='password'
							className={classes.TextField}
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
						<TextField
							variant='outlined'
							margin='normal'
							required
							id='handle'
							name='handle'
							label='handle'
							type='text'
							className={classes.TextField}
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
								<Link to='/signin' variant='body2'>
									Already have an account? Sign In
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
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
