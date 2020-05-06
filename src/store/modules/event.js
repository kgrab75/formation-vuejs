import EventService from '@/services/EventService'

export default {
  namespaced: true,
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAl(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your event has been created!'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          throw error
        })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS_TOTAl', response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    fetchEvent({ commit, getters, dispatch }, id) {
      var event = getters.getEventByID(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was a problem fetching an event: ' + error.message
            }
            dispatch('notification/add', notification, { root: true })
          })
      }
    }
  },
  getters: {
    getEventByID: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
