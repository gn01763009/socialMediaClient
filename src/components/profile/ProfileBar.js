import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserAvatar from './UserAvatar'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { fade } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'

// Redux
import { connect } from 'react-redux'
import { uploadImage, logoutUser } from '../../redux/actions/userAction'
// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import MoreListItem from '../../util/MoreListItem'

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
			width: 360,
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
	//scroll bar
	'@global': {
		'*::-webkit-scrollbar': {
			width: '0.6em',
			scrollBehavior: 'smooth',
		},
		'*::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: fade('#fff', 0.1),
			opacity: 0.4,
			borderRadius: '99em',
		},
	},
	// Drawer
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		marginBottom: 200,
		[theme.breakpoints.down('md')]: {
			display: 'none',
			zIndex: '-1',
		},
		transition: 'unset',
		overflow: 'hidden',
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
			width: '23vw',
			top: 60,
			left: 'auto',
		},
		[theme.breakpoints.up('lg')]: {
			display: 'flex',
			width: '340px',
			top: 60,
		},
		'& .MuiAvatar-root': {
			height: '5vh',
			width: '5vh',
		},
		'& .MuiTypography-root': {
			color: fade(theme.palette.common.white, 0.9),
		},
	},
	greyHr: {
		borderColor: fade(theme.palette.common.white, 0.1),
		width: '90%',
	},
	shortcutText: {
		color: fade(theme.palette.common.white, 0.3),
	},
	footer: {
		position: 'absolute',
		margin: theme.spacing(2),
		color: fade(theme.palette.common.white, 0.3),
	},
})
let iconUrl = {
	name: [
		'COVID-19 Information Center',
		'Friends',
		'Watch',
		'Memories',
		'Group',
	],
	url: [
		'https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/FZK_jEWapM0.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/FhOLTyUFKwf.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/Uy-TOlM5VXG.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png',
	],
}

class ProfileBar extends Component {
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
					<UserAvatar />
					{iconUrl.name.map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								<Avatar src={iconUrl.url[index]}></Avatar>
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
					{this.state.open ? <MoreListItem /> : null}
					<ListItem button onClick={this.handleClick}>
						<ListItemIcon>
							{this.state.open ? (
								<ExpandLessIcon style={{ fontSize: 30 }} />
							) : (
								<ExpandMoreIcon style={{ fontSize: 30 }} />
							)}
						</ListItemIcon>
						<ListItemText primary={this.state.open ? 'See less' : 'See more'} />
					</ListItem>
					<hr className={classes.greyHr} />
					<ListItem className={classes.shortcut}>
						<ListItemText
							className={classes.shortcutText}
							primary={'Your Shortcuts'}
						/>
					</ListItem>
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

ProfileBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ProfileBar))
