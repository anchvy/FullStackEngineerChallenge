import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Paper from '@material-ui/core/Paper'

const Wrapper = styled.div`
  display: flex;
`
const InfoPaper = styled(Paper)`
  && {
    flex: 0 0 25%;
    margin-right: 16px;
  }
`
const ActivitiesPaper = styled(Paper)`
  && {
    flex: 1 1 0;
  }
`

const GET_EMPLOYEE_INFO = gql`
  query GetEmployeeInfo {
    employee {
      id
      name
      role
      notifications {
        type
        title
        description
      }
      reviewScore
      reviews {
        id
        score
        text
        reviewer {
          id
          name
        }
        createdAt
      }
    }
  }
`

const Me = () => {
  const { loading, data } = useQuery(GET_EMPLOYEE_INFO)
  console.log('>>> [index.js] isLoading : ', loading)
  console.log('>>> [index.js] data : ', data)

  return (
    <Wrapper>
      <InfoPaper>test</InfoPaper>
      <ActivitiesPaper>test</ActivitiesPaper>
    </Wrapper>
  )
}

export default Me
