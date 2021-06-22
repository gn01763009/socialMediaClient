import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { fade } from '@material-ui/core/styles'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: 'rgb(48,48,48)',
			main: 'rgb(36,37,38)',
			dark: 'rgb(24,25,26)',
			contrasText: 'rgb(228,230,234)',
		},
		secondary: {
			light: '#63a4ff',
			main: '#1976d2',
			dark: '#004ba0',
			contrasText: '#fff',
		},
	},
	other: {
		typography: {
			useNextVariants: true,
		},
	},
})

export default theme
