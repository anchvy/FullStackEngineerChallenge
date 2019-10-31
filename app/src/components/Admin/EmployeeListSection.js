import React from 'react'
import PropTypes from 'prop-types'

import EmployeeInfo from '../Cards/EmployeeInfo'
import ItemListSection from '../ItemListSection'

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const EmployeeListSection = React.memo(props => {
  const { isLoading, employees } = props

  return (
    <ItemListSection isLoading={isLoading} title="All employees">
      {employees.map(employee => {
        if (!employee.isActive) return null

        return (
          <EmployeeInfo key={`employee-${employee.id}`} id={employee.id} name={employee.name} role={employee.role} />
        )
      })}
    </ItemListSection>
  )
})

EmployeeListSection.propTypes = {
  isLoading: PropTypes.bool,
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      role: PropTypes.string,
    })
  ),
}

EmployeeListSection.defaultProps = {
  isLoading: false,
  employees: [],
}

export default EmployeeListSection
