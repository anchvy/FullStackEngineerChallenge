import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Skeleton from '@material-ui/lab/Skeleton'
import UIPaper from '@material-ui/core/Paper'
import { SPACING, ON_MOBILE } from '../utils/styles'
import EmptyCard from './Cards/EmptyCard'

const Paper = styled(UIPaper)`
  && {
    flex: 1;
    padding: ${SPACING.XXL};

    ${ON_MOBILE`
      padding: ${SPACING.MD};
    `}
  }
`
const Title = styled.h2`
  font-weight: bold;
  margin-bottom ${SPACING.XL};
  text-transform: uppercase;
`
const LoadingItem = styled.div`
  display: flex;
  margin-bottom: ${SPACING.SM};
`
const LoadingContent = styled.div`
  width: 100%;
  margin-left: ${SPACING.SM};
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const SkeletonListLoading = () => (
  <>
    {Object.keys(Array(5).fill(0)).map(item => (
      <div key={item}>
        <LoadingItem>
          <Skeleton variant="circle" width={40} height={40} />
          <LoadingContent>
            <Skeleton height={6} width="40%" />
            <Skeleton height={6} width="80%" />
          </LoadingContent>
        </LoadingItem>
      </div>
    ))}
  </>
)

const ItemListSection = props => {
  const { isLoading, children, title } = props

  return (
    <Paper>
      <section>
        <Title>{title}</Title>
        {isLoading ? <SkeletonListLoading /> : <>{children.length === 0 ? <EmptyCard /> : children}</>}
      </section>
    </Paper>
  )
}

ItemListSection.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
}

ItemListSection.defaultProps = {
  isLoading: false,
  children: null,
}

export default ItemListSection
