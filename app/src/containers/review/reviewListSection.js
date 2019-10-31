import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import ReviewListSectionComponent from '../../components/Review/ReviewListSection'
import routes from '../../configs/routes'

export const GET_REVIEWS = gql`
  query reviews($id: String) {
    employee(id: $id) {
      id
      name
      reviews {
        id
        text
        isActive
        reviewer {
          id
          name
        }
      }
    }
  }
`

const ReviewListSection = props => {
  const history = useHistory()
  const { loading, data } = useQuery(GET_REVIEWS, { variables: { id: props.revieweeId } })
  const employee = get(data, 'employee', undefined)

  if (!loading && employee === null) {
    alert('INVALID_EMPLOYEE')
    history.push(routes.admin.path)
  }

  return (
    <ReviewListSectionComponent
      isLoading={loading}
      reviews={employee ? employee.reviews : []}
      name={employee ? employee.name : ''}
    />
  )
}

ReviewListSection.propTypes = {
  revieweeId: PropTypes.string.isRequired,
}

export default ReviewListSection
