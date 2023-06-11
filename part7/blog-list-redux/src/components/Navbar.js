import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { Link } from 'react-router-dom'
const pages = [
  {
    title: 'Blogs',
    url: '/blogs',
  },
  {
    title: 'Users',
    url: '/users',
  },
]

function CustomAppBar({
  handleOpenNavMenu,
  anchorElNav,
  handleCloseNavMenu,
  children,
}) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link
              style={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              to="/"
            >
              Home
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    key={page.title}
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textDecoration: 'none',
                    }}
                    to={page.url}
                  >
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link
              style={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              to="/"
            >
              Home
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuItem
                key={page.title}
                style={{ padding: '0', margin: '0 4px' }}
              >
                <Link
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '8px 16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                  to={page.url}
                >
                  {page.title}
                </Link>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>{children}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function Navbar({ onLogoutClick, user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  if (!user) {
    return (
      <CustomAppBar
        handleCloseNavMenu={handleCloseNavMenu}
        anchorElNav={anchorElNav}
        handleOpenNavMenu={handleOpenNavMenu}
      >
        <Button color="inherit">
          <Link
            style={{
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
            }}
            to="/login"
          >
            Login
          </Link>
        </Button>
      </CustomAppBar>
    )
  }

  return (
    <CustomAppBar
      handleCloseNavMenu={handleCloseNavMenu}
      anchorElNav={anchorElNav}
      handleOpenNavMenu={handleOpenNavMenu}
    >
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={onLogoutClick}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </CustomAppBar>
  )
}

export default Navbar
