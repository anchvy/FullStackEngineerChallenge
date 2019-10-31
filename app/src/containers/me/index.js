import React from 'react'

import InfoSection from './infoSection'
import ActivitiesSection from './activitiesSection'
import { Wrapper } from '../../components/styled/common'

const Me = () => (
  <Wrapper responsive>
    <InfoSection />
    <ActivitiesSection />
  </Wrapper>
)

export default Me
