import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CommentBtn from '../../util/CommentBtn'
import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
// MUI Stuff
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
// Icons
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
// Redux stuff
import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'
import axios from 'axios'

const styles = (theme) => ({
	invisibleSeparator: {
		border: 'none',
		margin: 4,
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid rgba(0,0,0,0.1)',
		marginBottom: 20,
	},
	profileImage: {
		maxWidth: 200,
		height: 200,
		borderRadius: '50%',
		objectFit: 'cover',
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: 'absolute',
		left: '90%',
	},
	spinnerDiv: {
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50,
	},
})

class ScreamDialog extends Component {
	state = {
		open: false,
		oldPath: '',
		newPath: '',
		comments: [],
	}
	componentDidMount() {
		if (this.props.openDialog) {
			let oldPath = window.location.pathname

			const { userHandle, screamId } = this.props
			const newPath = `/users/${userHandle}/scream/${screamId}`

			if (oldPath === newPath) oldPath = `/users/${userHandle}`

			window.history.pushState(null, null, newPath)

			axios.get(`/scream/${screamId}`).then((res) => {
				this.setState({ comments: res.data.comments })
			})

			this.setState({ open: true, oldPath, newPath })
			this.props.getScream(this.props.screamId)
			console.log(`I changed ${screamId}`)
		}
	}
	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath)
		this.setState({ open: false })
		this.props.clearErrors()
	}

	render() {
		const {
			classes,
			scream: { screamId },
			UI: { loading },
		} = this.props

		const dialogMarkup = this.state.open ? (
			<Grid container spacing={2}>
				<div></div>
				<Comments comments={this.state.comments} />
			</Grid>
		) : null
		return <Fragment key={screamId}>{dialogMarkup}</Fragment>
	}
}

ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	scream: state.data.scream,
	UI: state.UI,
	user: state.user,
})

const mapActionsToProps = {
	getScream,
	clearErrors,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog))
