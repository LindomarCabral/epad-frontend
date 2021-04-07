const routes = [
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/quotes', component: () => import('pages/quotes.vue') },
      { path: '/news', name: 'news', component: () => import('pages/news'), meta: {title: 'News'}},
      { path: '/users', component: () => import('pages/users.vue') }
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


// export default [ 

//   {
//     path: '/',
//     redirect: '/news',
//     component: () => import('layouts/MainLayout'),
//     meta: {auth: true},
//     children: [
//       { path: 'news', name: 'news', component: () => import('pages/news'), meta: {title: 'News'}} 
//     ]
//   },   
//   {
//     path: '/auth',
//     redirect: '/auth/login',
//     meta: {guest: true},
//     component: () => import('layouts/auth'),
//     children: [
//       {
//         path: 'login',
//         name: 'login',
//         component: () => import('pages/auth/login'),
//         meta: {title: 'Login'}
//       }
//     ]
//   },

//   { // Always leave this as last one
//     path: '*',
//     component: () => import('pages/Error404')
//   }
// ]
