export default [
  {
    path: '/',
    redirect: '/news',
    component: () => import('layouts/MainLayout'),
    meta: {auth: true},
    children: [
      {
        path: 'news',
        name: 'news',
        component: () => import('pages/news'),
        meta: {title: 'News'}
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    meta: {guest: true},
    component: () => import('layouts/auth'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/login'),
        meta: {title: 'Login'}
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/Error404')
  }
]
