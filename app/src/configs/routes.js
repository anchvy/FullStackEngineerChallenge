const routes = {
  me: {
    path: '/me',
  },
  admin: {
    path: '/admin',
  },
  auth: {
    path: '/',
  },
  review: {
    path: '/review/:id',
    resolver: id => `/review/${id}`,
  },
}

export default routes
