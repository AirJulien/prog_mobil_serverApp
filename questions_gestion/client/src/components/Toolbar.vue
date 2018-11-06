<template>
<v-toolbar flat color="rgb(1, 156, 223)">
    <v-toolbar-title>Gestionnaire des Questions</v-toolbar-title>
    <v-divider
    class="mx-2"
    inset
    vertical
    ></v-divider>
     <v-spacer></v-spacer>
    <Login v-if="!isAuth" ></Login>
    <logout v-if="isAuth"></logout>
</v-toolbar>
</template>

<script>
import Login from './Login'
import Logout from './Logout'
export default {
  computed: {
    isAuth: function () {
      return this.$store.getters.isAuth
    }
  },
  components: {Login, Logout}
}
</script>
