import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import BadgeAvatar from '../../util/BadgeAvatar'
import theme from '../../theme'
//MUI
import Grid from '@material-ui/core/Grid'
import { fade } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

// Redux

const styles = (theme) => ({
	commentBar: {
		paddingLeft: theme.spacing(1),
		marginTop: theme.spacing(2),
	},
	commentBody: {
		backgroundColor: fade(theme.palette.common.white, 0.15),
		borderRadius: '20px',
		color: theme.palette.primary.contrasText,
	},
	title: {
		marginTop: 4,
		marginLeft: theme.spacing(2),
		marginBottom: 0,
		fontSize: 15,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	body: {
		margin: theme.spacing(1),
		marginLeft: theme.spacing(2),
		marginTop: 0,
	},
	commentData: {
		color: theme.palette.primary.contrasText,
		fontWeight: 'bold',
		fontSize: 12,
	},
})

class Comments extends Component {
	render() {
		const { comments, classes } = this.props
		return (
			<Grid container>
				{' '}
				{comments
					? comments.map((comment, index) => {
							const { body, createdAt, userImage, userHandle } = comment
							return (
								<Fragment key={createdAt}>
									<Grid item xs={12}>
										<Grid container className={classes.commentBar}>
											<BadgeAvatar
												imageUrl={userImage}
												styledBadge={true}
												authenticated={true}
											/>
											<Grid>
												<Card className={classes.commentBody}>
													<Typography
														className={classes.title}
														to={`/users/${userHandle}`}
													>
														{userHandle}
													</Typography>
													<Typography className={classes.body} variant='body1'>
														{body}
													</Typography>
												</Card>
												<Typography
													className={classes.commentData}
													variant='body2'
												>
													{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</Fragment>
							)
					  })
					: null}
			</Grid>
		)
	}
}

Comments.propTypes = {
	comments: PropTypes.array,
}

export default withStyles(styles)(Comments)
