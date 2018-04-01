
function route (path, file, name,children) {
  return {
    props:true,
    exact: true,
    path,
    name,
    children,
    component: require(`~/pages/${file}.vue`)
  }
}

export default ({ authGuard, guestGuard }) => [
  route('','welcome','welcome'),
  // Authenticated routes.
  ...authGuard([
      route('/home','home','home'),
      route('/settings','settings/index',null,
        [
        route('','settings/profile'),
        route('profile','settings/profile','settings.profile'),
        route('password','settings/password','settings.password')
        ])
    ]),

  // Guest routes.
  ...guestGuard([
        route('/login','auth/login','login'),
        route('/register','auth/register','register'),
        route('/password/reset','auth/password/email','password.request'),
        route('/password/reset/:token','auth/password/reset','password.reset')
    ]),


    route('*','errors/404')
]
