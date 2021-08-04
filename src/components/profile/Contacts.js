import React, { Component } from 'react'
import BadgeAvatar from '../../util/BadgeAvatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

let iconUrl = {
	name: [
		'Marjana Dalisay',
		'Håkan Raine',
		'Othniel Camille',
		'Myla Charlène',
		'Hildur Chaleb',
		'Körbl Marita',
		'Vittorino Hans',
		'Clytemnestra Emilia',
		'Beatrix Kewin',
		'Aleksandrina Shaka',
		'Sheba Oscar',
		'Khshayarsha Danila',
		'Monika Agar',
		'Cristiano Stefan',
		'Elisa Klas',
		'Thersa Gregor',
		'Michael Kiss',
		'Chae-Young Erato',
		'Hervé Adam',
		'Doris Tore',
		'Reggie Lien',
	],
	url: [
		'https://source.unsplash.com/1600x900/?man',
		'https://source.unsplash.com/1600x901/?man',
		'https://source.unsplash.com/1600x902/?avatar',
		'https://source.unsplash.com/1600x903/?woman',
		'https://source.unsplash.com/1600x904/?avatar',
		'https://source.unsplash.com/1600x905/?woman',
		'https://source.unsplash.com/1600x906/?avatar',
		'https://source.unsplash.com/1600x907/?avatar',
		'https://source.unsplash.com/1600x908/?woman',
		'https://source.unsplash.com/1600x909/?avatar',
		'https://source.unsplash.com/1600x910/?man',
		'https://source.unsplash.com/1600x911/?avatar',
		'https://source.unsplash.com/1600x912/?avatar',
		'https://source.unsplash.com/1600x906/?woman',
		'https://source.unsplash.com/1600x907/?woman',
		'https://source.unsplash.com/1600x908/?man',
		'https://source.unsplash.com/1600x909/?woman',
		'https://source.unsplash.com/1600x910/?man',
		'https://source.unsplash.com/1600x911/?woman',
		'https://source.unsplash.com/1600x912/?man',
		'https://source.unsplash.com/1600x900/?hungary',
	],
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
})

class Sponsored extends Component {
	render() {
		const { classes } = this.props
		const sponsoredMarkup = (
			<List className={classes.sponsoredBar}>
				<Typography className={classes.sponsored} variant='subtitle1'>
					Contacts
				</Typography>
				{iconUrl.name.map((text, index) => (
					<ListItem className={classes.sponsoredItem} button key={text}>
						<ListItemIcon>
							<BadgeAvatar
								authenticated={true}
								imageUrl={iconUrl.url[index]}
							></BadgeAvatar>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		)
		return sponsoredMarkup
	}
}

export default withStyles(styles)(Sponsored)
