<template>
    <div class="add_house">
        <div class="data">
            <div class="data_title">
                <span>Адреса: </span>
            </div>
            <b-form-input v-model="house.address"></b-form-input>
        </div>
        <div class="data">
            <div class="data_title">
                <span>Статус: </span>
            </div>
            <div class="my_selector">
                <b-dropdown id="ddown-aria" :text="defaultStatus" variant="primary" class="m-2">
                    <b-dropdown-item-button aria-describedby="header1" 
                    v-for="(elem, index) in $root.statusList"
                    :key="index" 
                    :id="index" 
                    @click="saveStatus(elem.text)">{{elem.text}}</b-dropdown-item-button>
                </b-dropdown>
            </div>            
        </div>
        <div class="data">
            <div class="data_title">
                <span>Ціна: </span>
            </div>
            <b-form-input v-model="house.totalPrice"></b-form-input>
        </div>
        <div class="data">
            <div class="data_title">
                <span>Власник: </span>
            </div>
            <b-form-input v-model="house.ownerName"></b-form-input>
        </div>
        <p class="text-success">Кошторис</p>
        <!-- Витрати -->
        <div class="spending_wrap">
            <spending v-for="(cost,costIndex) in house.spending" :key="costIndex" :cost="cost" :costIndex="costIndex" :spending="house.spending"></spending>
        </div>
        <div class="save_house">
            <a class="button button-lg button-primary" @click="saveData">Save</a>
        </div>
    </div>
</template>

<script>
import spending from "./spending";
export default {
    data() {
        return {
            house: {
                address: "",
                status: "запланирован",
                totalPrice: "",
                ownerName: "",
                spending: [
                    {
                        spendingDescription: "",
                        price: ""
                    }
                ]
            },
            defaultStatus: "запланирован"
        }
    },
    methods: {
        saveStatus(text) {
            this.defaultStatus = text;
            this.house.status = text;
        },
        saveData() {
           // this.saveStatus(this.defaultStatus);
            // змінюємо кількість локально і в бд
            this.$root.number++;
            window.localStorage.setItem('number', JSON.stringify(this.$root.number));
            // записуєм елемент в бд
            window.localStorage.setItem(`house${this.$root.number}`, JSON.stringify(this.house));
            console.log(window.localStorage);
            // створюєм подію, яку слухаєм в батьківському компоненті і по якій додаєм в dom ще один будинок якщо їх < 5
            this.$emit('update');
            // очистити форму
            this.house = {
                address: "",
                status: "запланирован",
                totalPrice: "",
                ownerName: "",
                spending: [
                    {
                        spendingDescription: "",
                        price: ""
                    }
                ]
            }
        }
    },
    components: {
        spending,
    }
}
</script>

<style lang="scss" scoped>
    %standart {
        float: left;
        width: 100%;
    }
    %alignCenter {
        display: flex;
        justify-content: center;
    }
    .add_house {
        @extend %standart;
        width: calc(100% - 20px);
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        padding-bottom: 20px;
        margin: 10px;
        .data {
            @extend %standart;
            max-width: 800px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            margin-top: 20px;
            .data_title {
                @extend %standart;
                max-width: 200px;
                display: flex;
                justify-content: center;
            }
            input {
                font-size: 20px;
                margin-left: 20px;
                float: right;
            }
            .my_selector {
                @extend %standart;
                // font-size: 20px;
                margin-left: 20px;
                float: right;
            }
        }
    }
    #ddown-aria {
        // float: left;
        // width: 400px;
        margin-left: 0 !important;
        button {
            font-size: 20px !important;
            line-height: 30px;
        }
    }
    .text-success {
        margin-top: 20px;
        font-size: 25px;
    }
    .spending_wrap {
        @extend %standart;
        max-width: 900px;
    }
    .save_house {
        @extend %standart;
        @extend %alignCenter;
        margin-top: 30px;
        a {
            background-color: rgb(252,239,87);
            color: black;
            text-transform: uppercase;
            width: 150px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Kanit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-weight: 500;
            cursor: pointer;
            overflow: hidden;
            user-select: none;
            border-radius: 4px;
            &:hover {
                color: #fff;
                background-color: #35ad79;
            }
        }
    }
</style>
