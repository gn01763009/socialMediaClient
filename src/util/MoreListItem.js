import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Avatar, Grid } from '@material-ui/core'

let iconUrl = {
	name: [
		'Ads',
		'Blood Donations',
		'Business Manager',
		'Campus',
		'Climate Science Information Center',
		'Crisis Response',
		'Emotional Health',
		'Events',
		'Facebook Pay',
		'Favorites',
		'Friedn Lists',
		'Fundraisers',
		'Gaming Video',
		'Jobs',
		'Live Videos',
		'Marketplace',
		'Messenger',
		'Messenger Kids',
		'Most Recent',
		'Oculus',
		'Offers',
		'Pages',
		'Play Games',
		'Recent Ad Activity',
		'Saved',
		'Weather',
	],
	url: [
		'https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/C949oxkze-S.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/Eu3aZOl8riZ.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/z43DIXGhFg-.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Y7r38CcFEw5.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/4LP02rGQaMl.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/vG0kc45wHaG.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/z2lQL_jKCWe.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/N7UOh8REweU.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/vWBUs7aYAiK.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/nbUcQfHcgBv.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/W2a8PYyYhax.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/FMv4tTIpfwB.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/uKbvGNiYYgd.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/VoY5lgHtw8x.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/I6ojwg_zmx9.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/MN44Sm-CTHN.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/ocBBGg-gRd5.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/ilSiTyZwdJA.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/vEc1FLp5rSK.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/SynrhYjmPts.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/QucXUhmnkru.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/0gH3vbvr8Ee.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/JQCVtO0LVjk.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/DxwxddVlL2T.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/KlDlsO3UxDM.png',
		'https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/CToz82jp77m.png',
	],
}

export class MoreListItem extends Component {
	render() {
		const moreListItem = (
			<Grid>
				{iconUrl.name.map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							<Avatar src={iconUrl.url[index]}></Avatar>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</Grid>
		)

		return moreListItem
	}
}

export default MoreListItem
