import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ProfileBar from '../components/profile/ProfileBar'
import FriendBar from '../components/profile/FriendBar'
import Scream from '../components/scream/Scream'
import ScreamSkeleton from '../util/ScreamSkeleton'
import Story from '../components/scream/Story'
import PostBar from '../components/scream/PostBar'

import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'

const styles = {
	mainLayout: {
		display: 'flex',
		justifyContent: 'space-between',
		'& .profile': {
			minHeight: 'calc(100vh - 1)',
		},
	},
	screamBar: {
		maxWidth: 590,
	},
}
class home extends Component {
	componentDidMount() {
		this.props.getScreams()
	}
	render() {
		const { classes } = this.props
		const { screams, loading } = this.props.data
		console.log('home render')
		let recentScreamsMarkup = !loading ? (
			screams.map((scream) => {
				return <Scream key={scream.screamId} scream={scream} />
			})
		) : (
			<ScreamSkeleton />
		)
		return (
			<Grid
				className={classes.mainLayout}
				container
				spacing={false}
				item
				sm={12}
				xl={9}
			>
				<Grid item lg={3} className={classes.profile}>
					<ProfileBar></ProfileBar>
				</Grid>
				<Grid item lg={5} sm={12} className={classes.screamBar}>
					<Story />
					<PostBar />
					{recentScreamsMarkup}
				</Grid>
				<Grid item lg={3} className={classes.friendBar}>
					{/* <Profile /> */}
					<FriendBar></FriendBar>
				</Grid>
			</Grid>
		)
	}
}
home.propTypes = {
	getScreams: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
	data: state.data,
})

export default connect(mapStateToProps, { getScreams })(
	withStyles(styles)(home)
)
