import React from 'react'

import EmployeeListSection from './employeeListSection'
import CreateEmployeeSection from './createEmployeeSection'
import { Wrapper } from '../../components/styled/common'

const Admin = () => (
  <Wrapper>
    <CreateEmployeeSection />
    <EmployeeListSection />
  </Wrapper>
)

export default Admin
