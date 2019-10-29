import React, { useCallback } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'

import ActivitiesSectionComponent from '../../components/Me/ActivitiesSection'

const GET_EMPLOYEE_REVIEWS = gql`
  query GetEmployeeInfo {
    employee {
      id
      reviews {
        id
        text
        reviewee {
          id
          name
        }
      }
    }
  }
`

const ActivitiesSection = () => {
  const { loading, data } = useQuery(GET_EMPLOYEE_REVIEWS)
  const me = get(data, 'employee', {})

  return <ActivitiesSectionComponent isListLoading={loading} reviews={me.reviews} />
}

export default ActivitiesSection
