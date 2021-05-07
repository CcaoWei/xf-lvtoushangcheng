import storage from 'store'
import { login } from '@/api/index'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router/index'
// import { welcome } from '@/utils/util'

const user = {
  state: {
    token: ' ',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: storage.get('user'),
    cartCount: storage.get('cartCount'),
    personData: storage.get('personData')
  },

  mutations: {
    SET_PERSON_DATA: (state, personData) => {
      state.personData = personData
    },
    SET_CARTCOUNT: (state, cartCount) => {
      state.cartCount = cartCount
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
      storage.set('user', info)
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // console.log(userInfo)
        login(userInfo).then(response => {
          const result = response.data
          if (result.token) {
            storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_NAME', { name: result.userInfo.nickName })
            commit('SET_AVATAR', result.userInfo.avatarUrl)
            commit('SET_ROLES', result.userInfo)
            commit('SET_INFO', result)
            resolve(result)
          } else {
            resolve(result)
          }
          // storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          // commit('SET_TOKEN', result.token)
          // commit('SET_NAME', { name: result.userInfo.nickName })
          // commit('SET_AVATAR', result.userInfo.avatarUrl)
          // commit('SET_ROLES', result.userInfo)
          // commit('SET_INFO', result)

          // resolve(result)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // getInfo().then(response => {
        //   const result = response.result
        //
        //   if (result.role && result.role.permissions.length > 0) {
        //     const role = result.role
        //     role.permissions = result.role.permissions
        //     role.permissions.map(per => {
        //       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //         const action = per.actionEntitySet.map(action => { return action.action })
        //         per.actionList = action
        //       }
        //     })
        //     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
        //     commit('SET_ROLES', result.role)
        //     commit('SET_INFO', result)
        //   } else {
        //     reject(new Error('getInfo: roles must be a non-null array !'))
        //   }
        //
        //   commit('SET_NAME', { name: result.name, welcome: welcome() })
        //   commit('SET_AVATAR', result.avatar)
        //
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        storage.remove(ACCESS_TOKEN)
        storage.remove('user')
        storage.remove('cartCount')
        commit('SET_INFO', null)
        commit('SET_CARTCOUNT', 0)
        router.push({ path: '/home' })
        // logout(state.token).then(() => {
        //   resolve()
        // }).catch(() => {
        //   resolve()
        // }).finally(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   storage.remove(ACCESS_TOKEN)
        // })
      })
    }

  }
}

export default user
