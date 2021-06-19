import React, { Component, Fragment } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import MyButton from '../../util/MyButton'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
// MUI Stuff
import { Link } from 'react-router-dom'
// Icon
// Redux
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

class LikeButton extends Component {
	state = {
		open: false,
	}
	likedScream = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.screamId === this.props.screamId
			)
		)
			return true
		else return false
	}
	likeScream = () => {
		this.props.likeScream(this.props.screamId)
	}
	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId)
	}
	handleClick = (event, reason) => {
		this.setState({ open: true })
	}
	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		this.setState({ open: false })
	}
	render() {
		const { authenticated } = this.props.user
		const likeButton = !authenticated ? (
			<Fragment>
				<MyButton tip='Login first?' onClick={this.handleClick}>
					<FavoriteBorder />
				</MyButton>
				<Snackbar
					open={this.state.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
				>
					<Alert onClose={this.handleClose} severity='info'>
						Please Login first :)
						<Link to='/signin'> Login </Link>
					</Alert>
				</Snackbar>
			</Fragment>
		) : this.likedScream() ? (
			<MyButton tip='Undo like' onClick={this.unlikeScream}>
				<FavoriteIcon />
			</MyButton>
		) : (
			<MyButton tip='like' onClick={this.likeScream}>
				<FavoriteBorder />
			</MyButton>
		)
		return likeButton
	}
}

LikeButton.propTypes = {
	user: PropTypes.object.isRequired,
	screamId: PropTypes.string.isRequired,
	likeScream: PropTypes.func.isRequired,
	unlikeScream: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
	user: state.user,
})

const mapActionsToProps = {
	likeScream,
	unlikeScream,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
