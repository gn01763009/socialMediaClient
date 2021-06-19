import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'
// MUI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Collapse from '@material-ui/core/Collapse'
// Icon
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import { connect } from 'react-redux'
import theme from '../../theme'

const styles = {
	card: {
		position: 'relative',
		marginBottom: 14,
	},
	image: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	userHandle: {
		display: 'flex',
	},
	content: {
		padding: 25,
		objectFit: 'cover',
	},
	body: {
		margin: 20,
	},
	hr: {
		width: '100%',
		color: 'grey',
	},
	userInfo: {
		marginLeft: 8,
	},
	like: {
		textAlign: 'center',
	},
	comment: {
		textAlign: 'center',
	},
}

class Scream extends Component {
	render() {
		dayjs.extend(relativeTime)
		const {
			classes,
			scream: {
				body,
				createdAt,
				userImage,
				userHandle,
				screamId,
				likeCount,
				commentCount,
			},
			user: {
				authenticated,
				credentials: { handle },
			},
		} = this.props

		const deleteButton =
			authenticated && userHandle === handle ? (
				<DeleteScream screamId={screamId} />
			) : null
		return (
			<Card className={classes.card}>
				<CardMedia
					component='img'
					alt='Contemplative Reptile'
					height='140'
					image='https://source.unsplash.com/random/1200x800'
					title='Contemplative Reptile'
				/>
				<CardContent className={classes.content}>
					<Typography
						variant='h5'
						component={Link}
						to={`/users/${userHandle}`}
						color='primary'
						className={classes.userHandle}
					>
						<Avatar
							src={userImage}
							title='Profile image'
							className={classes.image}
						/>
						<Grid className={classes.userInfo} direction='column'>
							{userHandle}
							<Typography variant='body2' color='textSecondary'>
								{dayjs(createdAt).fromNow()}
							</Typography>
						</Grid>
						<Grid>{deleteButton}</Grid>
					</Typography>
					<Typography variant='body2' className={classes.body}>
						{body}
					</Typography>
					<hr className={classes.hr} />
					<Grid container direction='row' justify='space-around'>
						<Grid className={classes.like} item xs={6}>
							<LikeButton screamId={screamId} />
							<span>{likeCount} Likes</span>
						</Grid>
						<Grid className={classes.comment} item xs={6}>
							<ScreamDialog
								screamId={screamId}
								userHandle={userHandle}
								openDialog={this.props.openDialog}
							/>
							<span>{commentCount} comments</span>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		)
	}
}

Scream.propTypes = {
	user: PropTypes.object,
	scream: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	openDialog: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
