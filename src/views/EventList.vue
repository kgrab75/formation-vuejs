<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
      <template v-if="!lastPage"> | </template>
    </template>
    <template v-if="!lastPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { EventCard },
  created() {
    this.fetchEvents({ perPage: 3, page: this.page })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    lastPage() {
      return this.eventsTotal <= this.page * 3
    },
    ...mapState('event', ['events', 'eventsTotal']),
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
