import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MyButton from '../util/MyButton'
import PostScream from '../screa/PostScream'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import { Tooltip } from '@material-ui/core'

// Icons
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'

const styles = (theme) => ({
	AppBar: {
		margin: theme.spacing(8),
		Toolbar: {
			'& .nav-container': {},
		},
	},
	Typography: {
		color: theme.secondary,
	},
})

class Navbar extends Component {
	render() {
		const {
			classes,
			user: {
				credentials: { handle, imageUrl },
				loading,
				authenticated,
			},
		} = this.props
		return (
			<AppBar>
				<Toolbar className='nav-container'>
					{authenticated ? (
						<Fragment>
							<PostScream />
							<Link to='/'>
								<MyButton tip='Home'>
									<HomeIcon color='secondary' />
								</MyButton>
							</Link>
							<MyButton tip='Notifications'>
								<Notifications color='secondary' />
							</MyButton>
							<Button color='inherit' component={Link} to={`/${handle}`}>
								<Avatar src={imageUrl} />
								{handle}
							</Button>
						</Fragment>
					) : (
						<Fragment>
							<Button color='inherit' component={Link} to='/signin'>
								SignIn
							</Button>
							<Button color='inherit' component={Link} to='/'>
								Home
							</Button>
							<Button color='inherit' component={Link} to='/signup'>
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		)
	}
}
const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
	user: state.user,
})

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(withStyles(styles)(Navbar))
