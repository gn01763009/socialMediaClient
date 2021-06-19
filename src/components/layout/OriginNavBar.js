import React, { Component, Fragment, useReducer } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MyButton from '../../util/MyButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import InputBase from '@material-ui/core/InputBase'

// Icons
import HomeIcon from '@material-ui/icons/Home'
import { Avatar, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
const BootstrapButton = withStyles({
	root: {
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 16,
		padding: '6px 12px',
		border: '1px solid',
		lineHeight: 1.5,
		backgroundColor: '#0063cc',
		borderColor: '#0063cc',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#0062cc',
			borderColor: '#005cbf',
		},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	},
})(Button)

const styles = (theme) => ({
	AppBar: {
		margin: theme.spacing(8),
		Toolbar: {
			'& .nav-container': {
				display: 'flex',
			},
		},
	},
	Typography: {
		color: theme.secondary,
	},
	searchBar: {
		left: '5%',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

class Navbar extends Component {
	render() {
		const {
			user: {
				credentials: { handle, imageUrl },
				authenticated,
			},
			classes,
		} = this.props
		return (
			<AppBar>
				<Toolbar className='nav-container'>
					{authenticated ? (
						<Fragment>
							{/* TODO: (Left)   Seach Facebook */}
							<Grid className={classes.searchBar} item sm={3}>
								<div className={classes.search}>
									<div className={classes.searchIcon}>
										<SearchIcon />
									</div>
									<InputBase
										placeholder='Search Facebook'
										classes={{
											root: classes.inputRoot,
											input: classes.inputInput,
										}}
										inputProps={{ 'aria-label': 'search' }}
									/>
								</div>
							</Grid>
							{/* TODO: (Middle) Icons bar */}
							<BootstrapButton variant='contained'>
								<PostScream />
							</BootstrapButton>
							<BootstrapButton variant='contained'>
								<Link to='/'>
									<MyButton tip='Home'>
										<HomeIcon />
									</MyButton>
								</Link>
							</BootstrapButton>
							<BootstrapButton variant='contained'>
								<Notifications />
							</BootstrapButton>
							{/* TODO: (Right)  User bar */}
							<Link to={`/users/${handle}`}>
								<Avatar src={imageUrl}></Avatar>
							</Link>
						</Fragment>
					) : (
						<Fragment>
							<Button color='inherit' component={Link} to='/signin'>
								SignIn
							</Button>
							<Button color='inherit' component={Link} to='/'>
								Home
							</Button>
							<Button color='inherit' component={Link} to='/signup'>
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		)
	}
}
const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
	user: state.user,
})

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(withStyles(styles)(Navbar))
