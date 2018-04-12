import Vue from 'vue'

// state
export const state = {
  pageInfo:{
    pageTitle:null,
    pageDesc:null
  }
}

// mutations
export const mutations = {

  savePageInfo (state, payload) {
    state.pageInfo.pageTitle = payload.pageTitle
    state.pageInfo.pageDesc = payload.pageDesc
  },
  clearPageInfo (state) {
    state.pageInfo={
        pageTitle:null,
        pageDesc:null
      }
  }
}

// actions
export const actions = {

  setPageInfo ({ commit }, payload) {
    commit('savePageInfo', payload)
  }
}

// getters
export const getters = {
  pageInfo: state => state.pageInfo
}
