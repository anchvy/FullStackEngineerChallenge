## Installation

```
$ yarn && yarn start
```

## Tech stack

- Nodejs
- GraphQL with Apollo
- MongoDB

## API Docs

We have only single GraphQL endpoint with different queries and mutations.
Please see http://localhost:4000/ (after running local server) for existing queries and mutations, along with data fields information.

## Limitation

Regarding to current implementation, we have some limitation for the API following;
- Staff level is allowed to fetch an employee data only
- The reviewer is allowed to review once per reviewee

## What I have done
- User access handling
- Database connecting
- Error handling
- Auth Query/Mutation (Login/Verify current JWT token)
- Employee Query/Mutation (Create/Read/Update/Delete)
- Review Query/Mutation (Create/Read/Update/Delete)

## What I have *not* done
- Pagination
- Resource/query limiting
- Unit testing
- Typescript
