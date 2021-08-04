import React, { Component } from 'react'

//MUI
import List from '@material-ui/core/List'
import { Typography, ListItem } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

let sponsoredCompanies = {
	describe: [`Best product ever`, 'Booking now'],
	url: [
		'https://source.unsplash.com/random/1600x900?product',
		'https://source.unsplash.com/random/1600x900?budapest',
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
		marginRight: theme.spacing(2),
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		height: 'inherit',
		width: 'inherit',
		backgroundSize: 'cover',
		borderRadius: '10px',
		backgroundPosition: 'center 40%',
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
						<span className={classes.productImg}>
							<span
								className={classes.imageSrc}
								style={{
									backgroundImage: `url(${sponsoredCompanies.url[index]})`,
								}}
							/>
						</span>

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
