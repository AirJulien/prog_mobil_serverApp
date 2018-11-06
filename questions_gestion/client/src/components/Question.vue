<template>
	<div class = "Site">
		<Toolbar></Toolbar>
		<v-dialog v-if="isAuth" v-model="dialog" max-width="500px" @keydown.enter="save(nameNewQuestion,nameResponse1,nameResponse2,nameResponse3,radios)">
			<v-btn slot="activator" color="primary" dark class="mb-2">Ajouter une Question</v-btn>
			<v-card>
				<v-card-title>
					<span class="headline">Nouvelle Question</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm12 md12>
								<v-text-field v-model="nameNewQuestion" label="Titre"></v-text-field>
							</v-flex>
              <v-flex xs12 sm12 md12>
								<v-text-field v-model="nameResponse1" label="Réponse 1"></v-text-field>
							</v-flex>
              <v-flex xs12 sm12 md12>
								<v-text-field v-model="nameResponse2" label="Réponse 2"></v-text-field>
							</v-flex>
              <v-flex xs12 sm12 md12>
								<v-text-field v-model="nameResponse3" label="Réponse 3"></v-text-field>
							</v-flex>
              <v-flex xs12 sm6 md4>
              <v-radio-group v-model="radios" :mandatory="false" label="Quelle est la bonne réponse ?">
                 <v-radio  value="1" label="Réponse 1"></v-radio>
                 <v-radio  value="2" label="Réponse 2"></v-radio>
                 <v-radio  value="3" label="Réponse 3"></v-radio>
               </v-radio-group>
             </v-flex>
						</v-layout>
					</v-container>
				</v-card-text>
    		<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click="dialog = false">Annuler</v-btn>
					<v-btn color="blue darken-1" flat @click="save(nameNewQuestion,nameResponse1,nameResponse2,nameResponse3,radios)">Valider</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-data-table
		:headers="headers"
		:items="questions"
		hide-actions
    class="Site-content"
		>
			<template slot="items" slot-scope="props" >
				<tr>
          <td class="text-xs-left">{{ props.item.title_question }}</td>
					<td class="text-xs-left">{{ props.item.text_response1 }}</td>
          <td class="text-xs-left">{{ props.item.text_response2 }}</td>
          <td class="text-xs-left">{{ props.item.text_response3 }}</td>
          <td class="text-xs-left">{{ props.item.value_response1 === true ? "Réponse 1" : props.item.value_response2 === true ? "Réponse 2" :"Réponse 3"  }}</td>
					<td class="text-xs-left"><v-btn color="error" title="Supprimer?" @click="deleteQuestion(props.item._id)">X</v-btn></td>
				</tr>
			</template>
		</v-data-table>
	</div>
</template>

<script>
import bus from "../handler";
import axios from "axios";
import Toolbar from "./Toolbar";
export default {
  computed: {
        isAuth: function () {
        return this.$store.getters.isAuth
        }
    },
  data() {
    return {
      rules: {
        required: value => !!value || "Required."
      },
      dialog: false,
      radios : "1",
      nameNewQuestion: "",
      nameResponse1:"",
      nameResponse2:"",
      nameResponse3:"",
      headers: [
        {
          text: "Titre Question",
          value: "nameNewQuestion",
          sortable : false
        },
        {
          text: "Réponse 1",
          value: "nameResponse1",
          sortable: false
        },
        {
          text: "Réponse 2",
          value: "nameResponse2",
          sortable: false
        },
        {
          text: "Réponse 3",
          value: "nameResponse3",
          sortable: false
        },
        {
          text: "Bonne Réponse",
          value: "bonne_reponse",
          sortable: false
        },
        {
          text: "Supprimer",
          sortable: false
        }
      ],
      questions: []
    };
  },
  components: { Toolbar },
  created: function() {
	this.getAllQuestions();
  },
  methods: {
    deleteQuestion(id) {
      let uri = "http://localhost:5000/question/delete/" + id;
      axios.get(uri).then(res => {
          console.log(res);
        });
      this.getAllQuestions();
    },
    getAllQuestions() {
      let uri = "http://localhost:5000/question";
      axios.get(uri).then(response => {
        this.questions = response.data;
      });
    },
    close() {
      (this.dialog = false), (this.nameNewQuestion = ""),(this.nameResponse1 = ""),(this.nameResponse2 = ""),(this.nameResponse3 = "");
    },
    save(nameNewQuestion,nameResponse1,nameResponse2,nameResponse3,radios) {
      if (event) event.preventDefault();
      let url = "http://localhost:5000/question/create";
      let param = {
        title_question: nameNewQuestion,
        text_response1 : nameResponse1,
        text_response2 : nameResponse2,
        text_response3 : nameResponse3,
        value_response1 : radios === "1" ? true : false,
        value_response2 : radios === "2" ? true : false,
        value_response3 : radios === "3" ? true : false
      };
      axios
        .post(url, param)
        .then(res => {
          console.log(res);
          this.getAllQuestions();
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          this.close();
        });
	  }
  }
};
</script>

<style>
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.Site-content {
  flex: 1;
}
</style>
