import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import NoImg from '../image/no-img.png'
// MUI
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'
// Icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

const drawerWidth = 240

const styles = (theme) => ({
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
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
		},
		'*::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'*::-webkit-scrollbar-thumb': {
			backgroundColor: fade(theme.palette.common.white, 0.4),
			opacity: 0.4,
			borderRadius: '99em',
		},
	},

	// Drawer
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
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
		},
		'& .MuiAvatar-root': {
			height: '4.5vh',
			width: '4.5vh',
		},
		'& .MuiTypography-root': {
			color: fade(theme.palette.common.white, 0.9),
		},
	},
})

const ProfileSkeleton = (props) => {
	const { classes } = props
	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className='image-wrapper'>
					<img src={NoImg} alt='profile' className='profile-image' />
				</div>
				<div className='profile-details'>
					<div className={classes.handle} />
					<Skeleton animation='wave' variant='circle' width={40} height={40} />
					<div className={classes.fullLine} />
				</div>
			</div>
		</Paper>
	)
}

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileSkeleton)
