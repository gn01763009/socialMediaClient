import React, { Component } from 'react'
import { fade, withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import UserBarBtn from '../../util/UserBarBtn'
// Icon
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
const images = [
	{
		url: 'https://source.unsplash.com/random/1600x900',
		title: 'Reggie',
		avator: 'https://source.unsplash.com/800x600/?men',
	},
	{
		url: 'https://source.unsplash.com/random/1600x901',
		title: 'Halina',
		avator: 'https://source.unsplash.com/800x601/?woman',
	},
	{
		url: 'https://source.unsplash.com/random/1600x902',
		title: 'Zsolt Vásárhelyi',
		avator: 'https://source.unsplash.com/800x602/?men',
	},
	{
		url: 'https://source.unsplash.com/random/1600x903',
		title: 'Eva Leclerc',
		avator: 'https://source.unsplash.com/800x603/?woman',
	},
	{
		url: 'https://source.unsplash.com/random/1600x904',
		title: 'Sunny',
		avator: 'https://source.unsplash.com/800x604/?woman',
	},
]

const styles = (theme) => ({
	root: {
		position: 'relative',
		display: 'flex',
		minWidth: 375,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: '8px 0 24px 0',
		alignItems: 'center',
	},
	image: {
		width: 110,
		height: 196,
		padding: '0 2px',
		position: 'relative',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			width: '100% !important', // Overrides inline-style
			height: 100,
		},

		'&:hover, &$focusVisible': {
			zIndex: 1,
			'& $imageBackdrop': {
				opacity: 0.15,
			},
			' &$imageSrc': {
				backgroundPosition: 'center 90%',
			},
		},
	},
	focusVisible: {},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		borderRadius: '10px',
		backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: theme.palette.common.black,
		borderRadius: '10px',
		opacity: 0.4,
		transition: theme.transitions.create('opacity'),
	},
	avator: {
		position: 'absolute',
		border: '3px solid rgb(74, 135, 247)',
		top: 10,
		left: 10,
	},
	imageTitle: {
		position: 'absolute',
		bottom: 10,
		left: 9,
	},
	seeMore: {
		position: 'absolute',
		height: 50,
		width: 50,
		left: 'calc(100% - 30px)',
		zIndex: 1000,
		backgroundColor: theme.palette.primary.light,
		'& .MuiSvgIcon-root': {
			color: fade(theme.palette.common.white, 0.7),
		},
		'&:hover': {
			backgroundColor: fade(theme.palette.primary.main, 1),
		},
		'&:focus': {
			backgroundColor: fade(theme.palette.primary.main, 1),
		},
	},
})

class Story extends Component {
	render() {
		const { classes } = this.props

		return (
			<div>
				<div className={classes.root}>
					{images.map((image) => (
						<ButtonBase
							focusRipple
							key={image.title}
							className={classes.image}
							focusVisibleClassName={classes.focusVisible}
						>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${image.url})`,
								}}
							/>
							<span className={classes.imageBackdrop} />
							<Avatar className={classes.avator} src={image.avator} />
							<span className={classes.imageButton}>
								<Typography
									component='span'
									variant='subtitle1'
									color='inherit'
									className={classes.imageTitle}
								>
									{image.title}
									<span className={classes.imageMarked} />
								</Typography>
							</span>
						</ButtonBase>
					))}
					<UserBarBtn tipClassName={classes.seeMore} tip='See All Stories'>
						<ArrowForwardIcon style={{ fontSize: 20 }} />
					</UserBarBtn>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Story)
