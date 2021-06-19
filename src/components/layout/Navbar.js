import React, { Component, Fragment, useReducer } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NavBarButton from '../../util/NavBarButton'
import MyButton from '../../util/MyButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import InputBase from '@material-ui/core/InputBase'
import { Avatar, Grid } from '@material-ui/core'

// Icons
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import SearchIcon from '@material-ui/icons/Search'
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined'
import StorefrontIcon from '@material-ui/icons/Storefront'
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined'
import GamepadOutlinedIcon from '@material-ui/icons/GamepadOutlined'
import SendIcon from '@material-ui/icons/Send'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const styles = (theme) => ({
	AppBar: {
		margin: theme.spacing(1),
		minHeight: 'none',
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: 'none',
		paddingRight: 'none',
	},
	Typography: {
		color: theme.secondary,
	},
	icon: {
		height: 40,
		width: 40,
		borderRadius: '99em',
	},
	searchBar: {
		display: 'flex',
		alignItems: 'center',
	},
	search: {
		position: 'relative',
		borderRadius: '99em',
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(2),
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
		position: 'relative',
		padding: '10px 0',
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
	middleBar: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	userBar: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	handleBar: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row-reverse',
		alignItems: 'center',
	},
	handleName: {
		fontSize: '18px',
		color: '#fff',
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
				<Toolbar className={classes.toolBar}>
					{authenticated ? (
						<Fragment>
							{/* TODO: (Left)   Seach Facebook */}
							<Grid className={classes.searchBar} item sm={1}>
								<img
									className={classes.icon}
									src='https://source.unsplash.com/random'
								/>
								<div className={classes.search}>
									<div className={classes.searchIcon}>
										<SearchIcon style={{ color: 'grey' }} />
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
							<Grid className={classes.middleBar} item sm={5}>
								<Link to='/'>
									<NavBarButton tip='Home'>
										<HomeOutlinedIcon style={{ fontSize: 30 }} />
									</NavBarButton>
								</Link>
								<Link to='/'>
									<NavBarButton tip='Watch'>
										<SubscriptionsOutlinedIcon style={{ fontSize: 30 }} />
									</NavBarButton>
								</Link>
								<Link to='/'>
									<NavBarButton tip='Marketplace'>
										<StorefrontIcon style={{ fontSize: 30 }} />
									</NavBarButton>
								</Link>
								<Link to='/'>
									<NavBarButton tip='Gorups'>
										<SupervisedUserCircleOutlinedIcon
											style={{ fontSize: 30 }}
										/>
									</NavBarButton>
								</Link>
								<Link to='/'>
									<NavBarButton tip='Gaming'>
										<GamepadOutlinedIcon style={{ fontSize: 32 }} />
									</NavBarButton>
								</Link>
							</Grid>
							{/* TODO: (Right)  User bar */}
							<Grid className={classes.userBar} item sm={1}>
								<MyButton tip='Account'>
									<ArrowDropDownIcon style={{ fontSize: 24 }} />
								</MyButton>
								<Notifications />
								<MyButton tip='Messager'>
									<SendIcon style={{ fontSize: 24 }} />
								</MyButton>
								<PostScream />
								<div className={classes.handleBar}>
									<MyButton tip={`Hello! ${handle}`}>
										<Link to={`/users/${handle}`}>
											<Avatar src={imageUrl}></Avatar>
										</Link>
										<div className={classes.handleName}>{handle}</div>
									</MyButton>
								</div>
							</Grid>
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
