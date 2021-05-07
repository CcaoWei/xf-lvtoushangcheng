import router from './router'
// import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/less/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const blackList = ['/base/person', '/base/shopCart']
const loginRoutePath = '/login'
const baseRoutePath = '/base'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))

  if (to.path === '/') {
    next({ path: baseRoutePath })
  }
  if (blackList.includes(to.name)) {
    if (storage.get(ACCESS_TOKEN)) {
      next()
    } else {
      next({ path: loginRoutePath })
      NProgress.done()
    }
  } else {
    // 在免登录白名单，直接进入
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
