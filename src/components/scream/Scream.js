import React, { Component } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'
import CommentBtn from '../../util/CommentBtn'
import CommentForm from './CommentForm'
// MUI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import { Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { blue } from '@material-ui/core/colors'
import withStyles from '@material-ui/core/styles/withStyles'
// Icon
import PublicIcon from '@material-ui/icons/Public'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

// Redux
import { connect } from 'react-redux'
import theme from '../../theme'

const styles = {
	card: {
		position: 'relative',
		marginBottom: 14,
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	image: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	userHandle: {
		display: 'flex',
		alignItems: 'center',
	},
	day: {
		color: 'rgb(172,172,172)',
		fontSize: 12,
		display: 'flex',
		alignItems: 'center',
	},
	content: {
		padding: '12px 16px 10px 16px',
		objectFit: 'cover',
	},
	body: {
		margin: 20,
	},
	likeCommentCount: {
		color: 'rgb(172,172,172)',
		paddingBottom: '15px',
	},
	likecountNIcon: {
		display: 'flex',
		alignItems: 'center',
	},
	likecount: {
		margin: '0 0 0 5px',
	},
	userInfo: {
		marginLeft: 8,
		fontSize: 16,
		color: theme.palette.primary.contrastText,
		textTransform: 'capitalize',
	},
	like: {
		textAlign: 'center',
		'&::hover': {},
	},
	comment: {
		textAlign: 'center',
	},
	commentTypo: {
		margin: 10,
	},
	likeComment: {
		color: 'rgb(172,172,172)',
		borderTop: '1px solid rgb(87,88,86)',
		borderBottom: '1px solid rgb(87,88,86)',
	},
}

class Scream extends Component {
	state = {
		open: false,
	}
	handleOpen = () => {
		this.setState({ open: !this.state.open })
	}

	openComment = (open) => {
		this.setState({ open })
	}

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
				<CardContent className={classes.content}>
					<Typography
						variant='h5'
						color='primary'
						className={classes.userHandle}
					>
						<Avatar
							src={userImage}
							component={Link}
							title='Profile image'
							className={classes.image}
							to={`/users/${userHandle}`}
						/>
						<Grid
							component={Link}
							to={`/users/${userHandle}`}
							className={classes.userInfo}
							direction='column'
						>
							{userHandle}
							<Typography className={classes.day}>
								{dayjs(createdAt).fromNow()} .
								<PublicIcon style={{ fontSize: 14 }} />
							</Typography>
						</Grid>
						<Grid>{deleteButton}</Grid>
					</Typography>
					<Typography variant='body2' className={classes.body}>
						{body}
					</Typography>
					<Grid
						container
						direction='row'
						justify='space-between'
						alignItems='center'
						className={classes.likeCommentCount}
					>
						<span className={classes.likecountNIcon}>
							<ThumbUpAltIcon style={{ color: blue[500] }} />
							<span className={classes.likecount}>{likeCount}</span>
						</span>
						<span>{commentCount} Comments</span>
					</Grid>
					<Grid container direction='row' className={classes.likeComment}>
						<Grid item xs={6}>
							<LikeButton screamId={screamId} />
						</Grid>
						<Grid className={classes.comment} item xs={6}>
							<CommentBtn
								onClick={this.handleOpen}
								className={classes.commentTypo}
								title='Comment'
							>
								<ChatBubbleOutlineIcon style={{ marginRight: 10 }} />
							</CommentBtn>
						</Grid>
					</Grid>
					<CommentForm openComment={this.openComment} screamId={screamId} />
					{this.state.open ? (
						<ScreamDialog
							screamId={screamId}
							userHandle={userHandle}
							openDialog={true}
						/>
					) : null}
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
