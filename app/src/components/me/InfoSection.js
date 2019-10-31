import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UISkeleton from '@material-ui/lab/Skeleton'
import UIPaper from '@material-ui/core/Paper'
import { SPACING, ON_MOBILE } from '../../utils/styles'
import COLORS from '../../utils/colors'

const Skeleton = styled(UISkeleton)`
  && {
    width: 100%;
    margin-top: 0;
    margin-bottom: ${SPACING.XS};
  }
`
const Paper = styled(UIPaper)`
  && {
    flex: 0 0 20%;

    align-items: center;
    display: flex;
    flex-direction: column;
    margin-right: ${SPACING.MD};
    padding: ${SPACING.XXL};

    ${ON_MOBILE`
      margin-right: 0;
      margin-bottom: ${SPACING.MD};
      padding: ${SPACING.MD};
    `}
  }
`
const ImageBox = styled.div`
  position: relative;
`
const Image = styled.img`
  border-radius: 50%;
  margin-bottom: ${SPACING.XL};
  width: 150px;

  ${ON_MOBILE`
    margin-bottom: ${SPACING.SM};
    width: 100px;
  `}
`
const Name = styled.span`
  font-size: 24px;
  text-transform: uppercase;
`
const Number = styled.span`
  color: ${COLORS.DARK_GRAY};
  margin-bottom: ${SPACING.MD};
  margin-left: ${SPACING.SM};
`
const Role = styled.div`
  background: ${COLORS.RED};
  border-radius: 4px;
  color: white;
  display: inline-block;
  font-style: italic;
  padding: ${SPACING.XS} ${SPACING.SM};
  position: absolute;
  right: 0;
  text-transform: lowercase;
  top: 0;

  ${ON_MOBILE`
    font-size: 10px;
  `}
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const InfoSection = React.memo(props => {
  const { id, name, role, imageUrl, isLoading } = props
  const isAdmin = role === 'ADMIN'

  return (
    <Paper>
      <ImageBox>
        <Image src={imageUrl} alt="profile image" />
        {isAdmin && <Role role={role}>{role}</Role>}
      </ImageBox>
      {isLoading ? <Skeleton height={20} /> : <Name>{name}</Name>}
      {isLoading ? <Skeleton height={14} /> : <Number>{`(${id})`}</Number>}
    </Paper>
  )
})

InfoSection.propTypes = {
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.oneOf(['ADMIN', 'STAFF']),
}

InfoSection.defaultProps = {
  id: null,
  isLoading: false,
  imageUrl: '/tmp/images/member-placeholder.png',
  name: null,
  role: 'STAFF',
}

export default InfoSection
