const routes = [
  {
    path: '/menu',
    redirect: '/users',
    component: () => import('src/layouts/Menu.vue'),
    children: [
      { path: '/home', component: () => import('pages/Index.vue') },     
      { path: '/news', name: 'news', component: () => import('pages/news'), meta: {title: 'News'}},
      { path: '/users', component: () => import('pages/users.vue'),meta: {title: 'Usuarios'} }
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

export default routes

