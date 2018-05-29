
function route (path, file, name,meta,children) {
  return {
    props:true,
    exact: true,
    path,
    name,
    children,
    meta: { permissionRequired: meta },
    component: require(`~/pages/${file}.vue`)
  }
}

export default ({ authGuard, guestGuard }) => [
  route('','welcome','welcome'),
  // Authenticated routes.
  ...authGuard([
      route('/unauthorized','errors/unauthorized','unauthorized',null),
      route('/crud','crud/index','crud','user.create'),
      route('/test','auth/test','test',null),
      route('/home','home','home',null),
      route('/settings','settings/index',null,null,
        [
        route('','settings/profile',null,null),
        route('profile','settings/profile','settings.profile',null),
        route('password','settings/password','settings.password',null)
        ])
    ]),

  // Guest routes.
  ...guestGuard([
        route('/login','auth/login2','login',null),
        route('/register','auth/register2','register',null),
        route('/password/reset','auth/password/email','password.request',null),
        route('/password/reset/:token','auth/password/reset','password.reset',null)
    ]),
  
    { path: '*', component: require('~/pages/errors/404.vue') }
]
