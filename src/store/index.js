import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        counter: 0,
        house: null,
    },
    getters: {
       
    },
    actions: {
        // вся логіка, робота з сервером
        asyncInitQuiz(context) {
            console.log(this);
            Vue.http.get('http://localhost:3000/quiz')
            .then(response => response.json())
            .then(response => {
                console.log(context.state);
                context.commit('initQuiz',{response});
            })
        }
    },
    mutations: {
        initHouses() {
            // con
        }
        // initQuiz(context,{response}) {
        //     // context == state
        //     console.log(context);
        //     // не зовсім реактивні зміни!!!
        //     context.quiz.questions = response.array;
        //     context.quiz.congratulation = response.finishPage;
        //     context.quiz.userInfo = response.authorizationForm.formFields;
        //     context.quiz.userLocation = response.authorizationForm.geolocation;
        //     context.quiz.watermark = response.companyWatermark;
        //     context.quiz.userFormTitle = response.authorizationForm.title;
        //     console.log(context.quiz);
        // },
        // changeCounter(context, {value}) {
            
        //     context.counter = value;
        //     console.log(typeof context.counter);console.log(context.counter);
        // },
        // addToAnsweredList(context, payload) {
        //     console.log(context.counter);
        //     console.log(payload);
        //     context.answeredList.splice(context.counter,0,payload);
        // }

    }
})