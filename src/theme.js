import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#9a67ea',
			main: '#673ab7',
			dark: '#320b86',
			contrasText: '#fff',
		},
		secondary: {
			light: '#63a4ff',
			main: '#1976d2',
			dark: '#004ba0',
			contrasText: '#fff',
		},
		typography: {
			useNextVariants: true,
		},
	},
})

export default theme
