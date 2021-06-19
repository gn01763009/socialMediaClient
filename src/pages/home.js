import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Profile from '../components/profile/Profile'
import Scream from '../components/scream/Scream'
import ScreamSkeleton from '../util/ScreamSkeleton'

import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'

const styles = {
	profile: {},
}
class home extends Component {
	componentDidMount() {
		this.props.getScreams()
	}
	render() {
		const { classes } = this.props
		const { screams, loading } = this.props.data
		let recentScreamsMarkup = !loading ? (
			screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
		) : (
			<ScreamSkeleton />
		)
		return (
			<Grid container spacing={2}>
				<Grid item sm={3} xs={12} className={classes.profile}>
					<Profile />
				</Grid>
				<Grid item sm={8} xs={12}>
					{recentScreamsMarkup}
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
