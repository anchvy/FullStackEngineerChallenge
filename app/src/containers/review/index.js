import React from 'react'
import { get } from 'lodash'

import ReviewListSection from './reviewListSection'
import { Wrapper } from '../../components/styled/common'

const Review = props => {
  const id = get(props, 'match.params.id')

  return (
    <Wrapper>
      <ReviewListSection revieweeId={id} />
    </Wrapper>
  )
}

export default Review
