import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import UIAvatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { LAYOUT_PADDING } from '../utils/styles'
import COLORS from '../utils/colors'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: ${LAYOUT_PADDING};
  width: 100%;
`
const Logo = styled.img`
  width: 48px;
`
const Avatar = styled(UIAvatar)`
  && {
    text-transform: uppercase;
    background: ${COLORS.BLUE};
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const MENU_ORIGIN = {
  vertical: 'top',
  horizontal: 'right',
}
const NavigationBar = props => {
  const { name, menuItems, onClickLogoutButton } = props
  const [menuElement, setMenuElement] = React.useState(null)
  const isOpen = Boolean(menuElement)
  const history = useHistory()

  // avatar-button: onclick
  const onClickAvatarButton = event => setMenuElement(event.currentTarget)
  // menu-item: onclick
  const onClickCloseMenu = () => setMenuElement(null)

  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Logo src="/tmp/images/logo.png" alt="Logo" />
        <div>
          {name && <Avatar onClick={onClickAvatarButton}>{name.substr(0, 1)}</Avatar>}
          <Menu
            anchorEl={menuElement}
            anchorOrigin={MENU_ORIGIN}
            keepMounted
            transformOrigin={MENU_ORIGIN}
            onClose={onClickCloseMenu}
            open={isOpen}
          >
            {menuItems.map(menu => (
              <MenuItem
                key={menu.title}
                onClick={() => {
                  history.push(menu.redirectPath)
                  onClickCloseMenu()
                }}
              >
                {menu.title}
              </MenuItem>
            ))}
            <MenuItem onClick={onClickLogoutButton} key="logout">
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Container>
    </AppBar>
  )
}

NavigationBar.propTypes = {
  onClickLogoutButton: PropTypes.func.isRequired,
  name: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      redirectPath: PropTypes.string,
    })
  ),
}

NavigationBar.defaultProps = {
  name: null,
  menuItems: [],
}

export default NavigationBar
