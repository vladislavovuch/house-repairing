<template>
    <div class="add_house">
        <form action="" @click="">
            <div class="data">
                <div class="data_title">
                    <span>Адреса: </span>
                </div>
                <b-form-input v-model="house.address" required></b-form-input>
            </div>
            <div class="data">
                <div class="data_title">
                    <span>Статус: </span>
                </div>
                <div class="my_selector">
                    <b-dropdown id="ddown-aria" :text="defaultStatus.text" variant="primary" class="m-2">
                        <b-dropdown-item-button aria-describedby="header1" 
                        v-for="(elem, index) in $root.statusList"
                        :key="index" 
                        :id="index" 
                        @click="saveStatus(elem)">{{elem.text}}</b-dropdown-item-button>
                    </b-dropdown>
                </div>            
            </div>
            <div class="data">
                <div class="data_title">
                    <span>Ціна: </span>
                </div>
                <b-form-input v-model="house.totalPrice" required type="number"></b-form-input>
            </div>
            <div class="data">
                <div class="data_title">
                    <span>Власник: </span>
                </div>
                <b-form-input v-model="house.ownerName" required></b-form-input>
            </div>
            <p class="text-success">Кошторис</p>
            <!-- Витрати -->
            <div class="spending_wrap">
                <spending v-for="(cost,costIndex) in house.spending" :key="costIndex" :cost="cost" :costIndex="costIndex" :spending="house.spending"></spending>
            </div>
            <div class="save_house">
                <button class="button button-lg button-primary" type="submit" @click="saveData($event)">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import spending from "./spending";
export default {
    data() {
        return {
            house: {
                address: "",
                status: 1,
                totalPrice: "",
                ownerName: "",
                spending: [
                    {
                        spendingDescription: "",
                        price: ""
                    }
                ]
            },
            defaultStatus: {
                text: "запланирован",
                id: 1
            }
        }
    },
    methods: {
        saveStatus(elem) {
            this.defaultStatus = elem;
            this.house.status = elem.id;
        },
        checkValid() {
            for(let key in this.house) {
                if (this.house[key] === "") {
                    console.log(this.house[key]);
                    return false;
                }
            }
            return true;
        },
        saveData(event) {             
            if (!this.checkValid()) {
                alert("Введіть дані в усі поля");
                return;
            }
           // this.saveStatus(this.defaultStatus);
            // змінюємо кількість локально і в бд
            this.$root.number++;
            window.localStorage.setItem('number', JSON.stringify(this.$root.number));

            this.$root.housesList.push(this.house);
            // записуєм елемент в бд
            window.localStorage.setItem('housesList', JSON.stringify(this.$root.housesList));
            console.log(window.localStorage);
           
            // створюєм подію, яку слухаєм в батьківському компоненті і по якій додаєм в dom ще один будинок якщо їх < 5
            this.$emit('update');
            // очистити форму
            this.house = {
                address: "",
                status: 1,
                totalPrice: "",
                ownerName: "",
                spending: [
                    {
                        spendingDescription: "",
                        price: ""
                    }
                ]
            }
            event.preventDefault();
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
        form {
            @extend %standart;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
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
        button {
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
            transition: .3s;
            border: none;
            &:hover {
                color: #fff;
                background-color: #35ad79;
            }
        }
    }
</style>
