<template>
   <v-btn color="primary" @click="logout" dark class="mb-2">Logout</v-btn>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    logout: function () {
      console.log(this.$store)
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
