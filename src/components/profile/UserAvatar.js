import React, { Component } from 'react'
import PropTypes from 'prop-types'
// MUI
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Avatar } from '@material-ui/core'
// Redux
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class UserAvatar extends Component {
	render() {
		const {
			user: {
				credentials: { handle, imageUrl },
			},
		} = this.props
		const { authenticated } = this.props.user
		const userAvatar = !authenticated ? (
			<Link to={`/users/${handle}`}>
				<ListItem button>
					<ListItemIcon>
						<Avatar src={imageUrl}></Avatar>
					</ListItemIcon>
					<ListItemText primary={handle} />
				</ListItem>
			</Link>
		) : (
			<Link to={`/signup`}>
				<ListItem button>
					<ListItemIcon>
						<Avatar src={imageUrl}></Avatar>
					</ListItemIcon>
					<ListItemText primary={handle} />
				</ListItem>
			</Link>
		)
		return userAvatar
	}
}
const mapStateToProps = (state) => ({
	user: state.user,
})

UserAvatar.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(UserAvatar)
