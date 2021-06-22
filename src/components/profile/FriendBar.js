import React, { Component } from 'react'
import PropTypes from 'prop-types'

// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Divider from '@material-ui/core/Divider'
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
import { Link } from 'react-router-dom'

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import MoreListItem from '../../util/MoreListItem'
import Footer from '../../components/layout/Footer'
const drawerWidth = 240

const styles = (theme) => ({
	profileBar: {
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

class FriendBar extends Component {
	state = {
		open: false,
	}
	handleClick = (event, reason) => {
		this.state.open
			? this.setState({ open: false })
			: this.setState({ open: true })
	}
	render() {
		const {
			classes,
			user: {
				credentials: { handle, imageUrl },
			},
		} = this.props
		const drawer = (
			<div className={classes.profileBar}>
				<List>
					<Link to={`/users/${handle}`}>
						<ListItem button>
							<div className={classes.handleBar}>
								<ListItemIcon>
									<Avatar src={imageUrl}></Avatar>
								</ListItemIcon>
							</div>
							<ListItemText primary={handle} />
						</ListItem>
					</Link>
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
					<ListItem>
						<ListItemText primary={'Your Shortcut'} />
					</ListItem>
					<Divider />
				</List>
				<Footer footerClassName={classes.footer} />
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
