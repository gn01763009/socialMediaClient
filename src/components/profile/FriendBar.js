import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sponsored from './Sponsored'
import Contacts from './Contacts'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { fade } from '@material-ui/core/styles'

// Redux
import { connect } from 'react-redux'
import { uploadImage, logoutUser } from '../../redux/actions/userAction'

const drawerWidth = 240

const styles = (theme) => ({
	profileBar: {
		marginBottom: 200,
		[theme.breakpoints.down('md')]: {
			display: 'none',
			zIndex: 'auto',
		},
	},
	'& .MuiDrawer-paperAnchorLeft': {
		[theme.breakpoints.down('md')]: {
			display: 'none',
			zIndex: 'auto',
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			marginRight: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	//Divider
	'.MuiDivider-root': {
		color: fade(theme.palette.common.white, 0.4),
	},

	// Drawer
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		[theme.breakpoints.down('lg')]: {
			display: 'none',
			zIndex: 'auto',
		},
		transition: 'unset',
		overflow: 'hidden',
		width: '-webkit-fill-available',

		'&:hover': {
			overflowY: 'scroll',
		},
		'& .MuiButtonBase-root': {
			borderRadius: '0.4em',
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.15),
				borderColor: '#0062cc',
				boxShadow: 'none',
			},
			'&:focus': {
				'& .MuiSvgIcon-root': {
					color: fade('#2e81f4', 1),
				},
				backgroundColor: fade('#2e81f4', 0.15),
			},
		},
		'& .MuiSvgIcon-root': {
			color: fade(theme.palette.common.white, 0.9),
		},
		'& .MuiListItemIcon-root': {
			minWidth: '50px',
		},
		backgroundColor: theme.palette.primary.dark,
		color: fade(theme.palette.common.white, 0.9),
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			top: 60,
			left: 'auto',
		},
		[theme.breakpoints.up('xl')]: {
			display: 'flex',
			width: '363px',
			top: 60,
		},
		'& .MuiAvatar-root': {
			height: '4.5vh',
			width: '4.5vh',
		},
		'& .MuiTypography-root': {
			color: fade(theme.palette.common.white, 0.9),
		},
	},
	footer: {
		position: 'absolute',
	},
})

class FriendBar extends Component {
	state = {
		open: false,
	}
	handleClick = () => {
		this.state.open
			? this.setState({ open: false })
			: this.setState({ open: true })
	}
	render() {
		const { classes } = this.props
		const drawer = (
			<div className={classes.profileBar}>
				<List>
					<Sponsored />
					<Contacts />
				</List>
			</div>
		)

		return (
			<Drawer
				classes={{
					paper: classes.drawerPaper,
				}}
				variant='permanent'
				open
			>
				{drawer}
			</Drawer>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
})
const mapActionsToProps = { logoutUser, uploadImage }

FriendBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(FriendBar))
