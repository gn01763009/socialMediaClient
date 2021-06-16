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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
//Redux stuff
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userAction'
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

class signin extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
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
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}
		this.props.loginUser(userData, this.props.history)
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
						Sign in
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
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
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
							Sign In
							{loading && <CircularProgress className={classes.progress} />}
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to='/signin' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to='/signup' variant='body2'>
									Don't have an account? Sign Up
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

export function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<a
				color='inherit'
				href='https://www.reggie.life/'
				target='_blank'
				rel='noopener noreferrer'
			>
				Reggie.Life
			</a>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}
signin.propTypes = {
	classes: propTypes.object.isRequired,
	loginUser: propTypes.func.isRequired,
	user: propTypes.object.isRequired,
	UI: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
})
const mapActionsToProps = {
	loginUser,
}
export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(signin))
