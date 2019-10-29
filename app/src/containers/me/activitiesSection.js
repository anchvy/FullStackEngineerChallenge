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
const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: String!, $data: InputReview!) {
    updateReview(id: $id, data: $data) {
      id
    }
  }
`

const ActivitiesSection = () => {
  const [mutate] = useMutation(UPDATE_REVIEW)
  const { loading, data, refetch } = useQuery(GET_EMPLOYEE_REVIEWS)
  const me = get(data, 'employee', {})

  // submit-button: onclick
  const onSubmitReview = useCallback(
    async (id, text) => {
      const updateResponse = await mutate({ variables: { id, data: { text } } })
      if (get(updateResponse, 'data.updateReview.id')) {
        refetch()
      }
    },
    [mutate, refetch]
  )

  return <ActivitiesSectionComponent isListLoading={loading} reviews={me.reviews} onSubmitReview={onSubmitReview} />
}

export default ActivitiesSection
