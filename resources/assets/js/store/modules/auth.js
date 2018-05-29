import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'

// state
export const state = {
  roles:null,
  user: null,
  token: Cookies.get('token')
}

// mutations
export const mutations = {
  SAVE_TOKEN (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  FETCH_USER_SUCCESS (state, { user }) {
    state.user = user
    state.roles = user.roles
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
    Cookies.remove('token')
  },

  LOGOUT (state) {
    state.roles = null
    state.user = null
    state.token = null

    Cookies.remove('token')

    Vue.toasted.show("You are successfully logout", { 
               theme: "success",
               icon:'done'
            });
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit('SAVE_TOKEN', payload)
  },

  async fetchAuthData ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')
      
      console.log("hddhddhdhhd" );
      console.log("data", data);
      
      commit('FETCH_USER_SUCCESS', { user: data.user })
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },

  async updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) { }

    commit('LOGOUT')
  }
}

// getters
export const getters = {
  authUser: state => state.user,
  authToken: state => state.token,
  authCheck: state => state.user !== null,
  authRoles:state=>state.roles,
  authPermissions:state=>state.user !== null ? state.user.permissions : null
}
