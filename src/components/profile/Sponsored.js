import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Card, Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

let sponsoredCompanies = {
	describe: [`Best product ever`, 'Booking now'],
	url: [
		'https://source.unsplash.com/1600x900/?product,adv',
		'https://source.unsplash.com/1600x900/?budapest',
	],
	webUrl: ['www.bestproduct.com', 'www.budapestbest.hu'],
}
const styles = (theme) => ({
	sponsoredBar: {
		paddingRight: 16,
		borderBottom: `1px solid ${theme.palette.primary.light}`,
		paddingLeft: 0,
	},
	sponsored: {
		paddingLeft: theme.spacing(3),
		paddingRight: 16,
		paddingBottom: 5,
		fontWeight: 'bold',
	},
	productImg: {
		height: 110,
		width: 120,
		borderRadius: '10px',
		marginRight: theme.spacing(2),
		paddingLeft: 0,
	},
})

class Sponsored extends Component {
	render() {
		const { classes } = this.props
		const sponsoredMarkup = (
			<List className={classes.sponsoredBar}>
				<Typography className={classes.sponsored} variant='subtitle1'>
					Sponsored
				</Typography>
				{sponsoredCompanies.describe.map((text, index) => (
					<ListItem className={classes.sponsoredItem} button key={text}>
						<img
							className={classes.productImg}
							src={sponsoredCompanies.url[index]}
						></img>
						<Typography variant='subtitle1'>
							{text}
							<Typography paragraph variant='subtitle2'>
								{sponsoredCompanies.webUrl[index]}
							</Typography>
						</Typography>
					</ListItem>
				))}
			</List>
		)
		return sponsoredMarkup
	}
}

export default withStyles(styles)(Sponsored)
