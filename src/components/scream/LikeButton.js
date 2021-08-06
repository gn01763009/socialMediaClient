import React, { Component, Fragment } from 'react'
import LikeBtn from '../../util/LikeBtn'
import PropTypes from 'prop-types'
// Redux
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Icon
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded'
// MUI Stuff
import { blue } from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

class LikeButton extends Component {
	state = {
		open: false,
		likeHandle: false,
	}
	static getDerivedStateFromProps(props, state) {
		if (
			props.user.likes &&
			props.user.likes.find((like) => like.screamId === props.screamId)
		)
			return { likeHandle: true, requesting: false }
		else return { likeHandle: false, requesting: false }
	}
	likeScream = () => {
		this.props.likeScream(this.props.screamId, this.props.scream)
		this.setState({ requesting: true })
	}
	unlikeScream = () => {
		this.props.unlikeScream(this.props.screamId, this.props.scream)
		this.setState({ requesting: true })
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
				<LikeBtn onClick={this.handleClick} title='Like'>
					<ThumbUpAltOutlinedIcon style={{ marginRight: 10 }} />
				</LikeBtn>
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
		) : this.state.likeHandle ? (
			<LikeBtn onClick={this.unlikeScream} title='Like'>
				<ThumbUpAltRoundedIcon style={{ color: blue[500], marginRight: 10 }} />
			</LikeBtn>
		) : (
			<LikeBtn onClick={this.likeScream} title='Like'>
				<ThumbUpAltOutlinedIcon style={{ marginRight: 10 }} />
			</LikeBtn>
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
