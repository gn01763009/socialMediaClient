import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Comments from './Comments'
// MUI Stuff
import Grid from '@material-ui/core/Grid'
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
		comments: [],
	}
	componentDidMount() {
		const { screamId } = this.props
		// for the init data
		if (this.props.openDialog || this.props.submitUpdate) {
			axios.get(`/scream/${screamId}`).then((res) => {
				this.setState({ comments: res.data.comments })
			})
		}
	}
	componentDidUpdate() {
		if (
			this.props.openDialog &&
			this.props.screamId === this.props.submitUpdate
		) {
			axios.get(`/scream/${this.props.screamId}`).then((res) => {
				// update comments from 'CommentForm'
				if (this.state.comments.length !== res.data.comments.length) {
					this.setState({ comments: res.data.comments })
				}
			})
		}
	}

	render() {
		return (
			<Fragment>
				{this.props.openDialog ? (
					<Grid container spacing={2}>
						<Comments comments={this.state.comments} />
					</Grid>
				) : null}
			</Fragment>
		)
	}
}

ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	data: state.data,
})

const mapActionsToProps = {
	getScream,
	clearErrors,
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ScreamDialog))
