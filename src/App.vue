<template>
    <div id="app">
        <div class="wrap">
            <div class="add_house">
                <a class="button button-lg button-primary" href="#" @click="toggleForm">Add new house</a>
            </div>
            <div class="form_animation zero_height" ref="myForm">
                <add-form @update="addNewHouse"></add-form>
            </div>
            <div class="filter">
                <b-dropdown id="ddown-aria" :text="defaultValue.text" variant="primary" class="m-2">
                    <b-dropdown-item-button aria-describedby="header1" 
                    v-for="(elem, index) in $root.statusList"
                    :key="index" 
                    :id="index" 
                    @click="saveSelectedValue(elem)">{{elem.text}}</b-dropdown-item-button>
                </b-dropdown>
                <button class="btn btn_filter" @click="activateFilter">Filter</button>
            </div>
           <house v-for="(house,index) in filteredHousesList" :key="`filteredHousesList${index}`" :house="house" :index="index" @updated-status="filterHouses"></house>
        </div>
    </div>
</template>

<script>
import house from './house'
import addForm from './addForm'

export default {
    name: 'app',
    data () {
        return {
            counter: 0,
            price: 1000,
            showAddForm: false,
            house: {
                address: "Келецька 98, кв 307/2",
                status: 1,
                totalPrice: 1000,
                ownerName: "Державна власність",
                spending: [
                    {
                        spendingDescription: "Фарба для підлоги",
                        price: 100
                    },
                    {
                        spendingDescription: "Кісточки та валики",
                        price: 100
                    },
                    {
                        spendingDescription: "Шпалери",
                        price: 200
                    },
                    {
                        spendingDescription: "Клей",
                        price: 100
                    },
                    {
                        spendingDescription: "Штукатурка",
                        price: 400
                    },
                    {
                        spendingDescription: "Розетки",
                        price: 100
                    },
                ]
            },
            defaultValue: {
                text: "запланирован",
                id: 1
            },
            showAdditionalInfo: false,
            filteredHousesList: [],
            filtered: false,
        }
    },
    methods: {
        toggleForm() {
            //якщо height==auto і присвоїти height - 0, не буде анімації
            this.$refs.myForm.classList.toggle('zero_height');
            this.$refs.myForm.classList.toggle('auto_height');
        },
        saveSelectedValue(elem) {
            this.defaultValue = elem;
        },
        scroll() {
            window.onscroll = () => {
                // якшо скролінг за 50 пікселів або менше підгружаєм контент
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 50 >= document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.addContent();
                }
            };
        },
        addNewHouse() {
            if (this.counter < 5) {
                this.addContent();
            }
            this.toggleForm();
        },
        addContent() {
            // отримуєм storage
            let storage = window.localStorage;
            // кількість домів в storage
            //this.$root.number = Number(storage.getItem('number'));
            const list = JSON.parse(storage.getItem(`housesList`));
            if (list)
                this.$root.housesList = list;
            // 5 наступних домів виводим
            // for (let i = this.counter; i < this.counter + 5 && i < this.$root.number; i++) {
            //     this.housesList.push(JSON.parse(storage.getItem(`house${i + 1}`)));
            // }
            // if (this.counter + 5 <= this.$root.number) {
            //     this.counter += 5;
            // } else {
            //     this.counter = this.$root.number;
            // }
            if (this.$root.number + 5 > this.$root.housesList.length) {
                this.$root.number = this.$root.housesList.length;
            } else {
                this.$root.number += 5;
            }
            console.log(this.$root.number)
            // this.$root.counter
            // this.$root.housesList.length
            this.filterHouses();
        },
        filterHouses() {
            let i = 0;
            this.filteredHousesList = this.$root.housesList.filter(house => {
                if (i === Number(this.$root.number))
                    return false;
                i++;
                if (this.filtered) {
                    console.log(Number(house.status) , Number(this.defaultValue.id))
                    return Number(house.status) === Number(this.defaultValue.id);
                }
                return true;

            });
        },
        activateFilter() {
            this.filtered = true;
            this.filterHouses();
        },
        saveSelectedValue(text) {
            this.defaultValue = text;
        }
    },
    components: {
        house,
        addForm,
    },
    created() {
        let storage = window.localStorage;
        console.log(storage);
        // storage.setItem("number", 1);
        // init storage
        // storage.clear();
        // storage.setItem("number", 10);
        // for (let i = 0; i < 10; i++) {
        //     storage.setItem(`house${i + 1}`, JSON.stringify(this.house));
        // }
        // завантаження 5 будинків
        this.addContent();
        // подія для підгрузки по скролінгу
        this.scroll();
    }
}
</script>

<style lang="scss">
   
    * {
        margin: 0;
        padding: 0;
    }
    %standart {
        float: left;
        width: 100%;
    }
    %alignCenter {
        display: flex;
        justify-content: center;
    }
    #app {
        @extend %standart;
        @extend %alignCenter;
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
    .wrap {
        @extend %standart;
        max-width: 1140px;
    }
    .house {
        float: left;
        width: calc(100% - 20px);
        margin: 10px;
        border: 1px solid black;
        // z-index: 1;
        // background-color: #fff;
    }
    .main_info {
        @extend %standart;
        
        display: flex;
        // flex-wrap: wrap;
        @media screen and (max-width: 700px) {
            flex-direction: column;
        }
    }
    .house_img {
        @extend %standart;
        padding: 20px;
        @extend %alignCenter;
        align-items: center;
        max-width: 350px;
        @media screen and (max-width: 700px) {
            max-width: 100%;
        }
        img {
            @extend %standart;
            width: 100%;
            height: 100%;
            max-width: 300px;
            max-height: 300px;
            object-fit: cover;
        }
    }
    .house_data {
        @extend %standart;
        @extend %alignCenter;
        align-items: center;
        position: relative;

        .house_data__center {
            @extend %standart;
        }
        p {
            @extend %standart;
            @extend %alignCenter;
        }
        .address {
            @extend %standart;
            margin-top: 20px;
            p {
                font-size: 25px;
                font-weight: 500;
            }
        }
        .status {
            @extend %standart;
            margin-top: 20px;
            @extend %alignCenter;
            .selector_wrap {
                float: left;
                width: calc(100% - 40px);
                max-width: 400px;
                cursor: pointer;
            }
        }
        .price {
            @extend %standart;
            margin-top: 20px;
            p {
                font-size: 20px;
            }
        }
    }
    .details {
        @extend %standart;
        position: absolute;
        bottom: 10px;
        span {
            float: right;
            margin-right: 40px;
            cursor: pointer;
        }
    }
    .additional_info {
        @extend %standart;
        margin-bottom: 20px;
    }
    .owner {
        @extend %standart;
        margin-top: 20px;
        p {
            font-size: 25px;
            font-weight: 500;
        }
    }
    .spending_money {
        @extend %standart;
        margin-top: 20px;
        display: flex;
        
    }
    .spending_money_wrap {
        @extend %standart;
        display: flex;
        .material {
            @extend %standart;
            display: flex;
        }
        .price {
            @extend %standart;
            max-width: 300px;
            display: flex;
            input {
                max-width: 200px;
            }
        }
        input {
            margin-left: 20px;
            font-size: 20px;
        }
        span {
            margin-left: 20px;
            font-size: 25px;
        }
        @media screen and (max-width: 700px){
            flex-direction: column; 
            .price {
                margin-top: 20px;
                max-width: 100%;
                input {
                    max-width: 100%;
                }
            }
        }
    }
    .control_buttons {
        @extend %standart;
        max-width: 140px;
        @extend %alignCenter;
        align-items: center;
        button {
            @extend %standart;
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-left: 20px;
            // border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            // outline: none;
            cursor: pointer;
            svg {
                float: left;
                width: 100% !important;
                height: 100% !important;
            }
        }
    }
    .add_house {
        @extend %standart;
        @extend %alignCenter;
        margin: 20px 0;
        a {
            color: #fff;
            background-color: #35ad79;
            border-color: #35ad79;
            padding: 20px 50px;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            // display: inline-block;
            line-height: 1.25;
            font-family: "Kanit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            letter-spacing: 0.025em;
            text-transform: uppercase;
            cursor: pointer;
            user-select: none;
            border-radius: 4px;
            transition: .3s ease-out all;
            font-weight: 600;
            &:hover {
                background-color: rgb(252,239,87);
                color: black;
            }
        }
    }
    
    .form_animation {
        @extend %standart;
        // height: 0px;
        overflow: hidden;
        box-sizing: inherit;
        transition: height .7s !important;
    }
    .filter {
        @extend %standart;
        @extend %alignCenter;
        align-items: center;
        .btn_filter {
            background-color: rgb(255, 255, 30);
            color: #2e3532;
            float: left;
            width: 200px;
            font-size: 20px !important;
            padding: 0;
            // font-weight: 500;
            height: 50px;
            margin-left: 100px;
            cursor: pointer;
            &:hover {
                background-color: rgb(243, 243, 26);
                // color: rgb(85, 87, 59);
            }
        }
    }
    .auto_height{
        height: auto;
    }
    .zero_height {
        height: 0px;
    }
</style>
