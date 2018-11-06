<template>
  <v-dialog v-model="dialog" max-width="500px" @keydown.enter="login">
    <v-btn slot="activator" color="primary" dark class="mb-2">Login</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Login </span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm12 md12>
              <v-text-field v-model="username" label="Identifiant"></v-text-field>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <v-text-field type="password" v-model="password" label="Mot de passe"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="close">Annuler</v-btn>
        <v-btn color="blue darken-1" flat @click="login">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      dialog: false,
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', {username, password})
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
        .then(this.close)
    },
    close () {
      this.dialog = false
      this.username = ''
      this.password = ''
    }
  }
}
</script>
