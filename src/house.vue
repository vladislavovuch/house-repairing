<template>
     <div class="house">
        <div class="main_info">
            <div class="house_img">
                <img src="../imgs/house.png">
            </div>
            <div class="house_data">
                <div class="house_data__center">
                    <div class="address">
                        <p>{{house.address}}</p>
                    </div>
                    <div class="status">
                        <div class="selector_wrap">
                            <b-dropdown id="ddown-aria" :text="house.status" variant="primary" class="m-2">
                                <b-dropdown-item-button aria-describedby="header1" 
                                v-for="(elem, index) in statusList"
                                :key="index" 
                                :id="index" 
                                @click="saveSelectedValue(elem.text)">{{elem.text}}</b-dropdown-item-button>
                            </b-dropdown>
                        </div>
                    </div>
                    <div class="price">
                        <p>Price {{house.totalPrice}} ua</p>
                    </div>
                </div>
                <div class="details">
                    <span @click="showAdditionalInfo = !showAdditionalInfo">Подробнее</span>
                </div>
            </div>
        </div>
        <transition name="add_info">
            <div class="additional_info" v-if="showAdditionalInfo">
                <div class="owner">
                    <p class="text-primary text-center">Власник: {{house.ownerName}}</p>
                </div>
                <spending v-on:save="saveNewData" v-if="house.spending.length !== 0" v-for="(cost,costIndex) in house.spending" :key="costIndex" :cost="cost" :costIndex="costIndex" :spending="house.spending"></spending>
                <!-- <div class="spending_money" v-if="house.spending.length !== 0" v-for="(cost,costIndex) in house.spending" :key="costIndex">
                    
                    <div class="spending_money_wrap">
                        <div class="material">
                            <span>Витрата: </span>
                            <b-form-input v-model="cost.spendingDescription"></b-form-input>
                        </div>
                        
                        <div class="price">
                            <span>Price:</span>
                            <b-form-input v-model="cost.price"></b-form-input>
                        </div>
                    </div>
                    <div class="control_buttons">
                        <b-button class="add" variant="success" @click="addSpending(house.spending, costIndex)">
                            <svg aria-hidden="true" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                            </svg>
                        </b-button>
                        <b-button class="delete" variant="danger" @click="deleteCost(house.spending, costIndex)">
                            <svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                            </svg>
                        </b-button>
                    </div>
                </div>
                <div class="load" v-if="house.spending.length === 0">
                    <a class="button button-lg button-primary" href="#" @click.prevent="addSpending(house.spending,-1)">Add new cost</a>
                </div> -->
            </div>
        </transition>
    </div>
</template>

<script>
import mySelector from './mySelector'
import spending from './spending'

export default {
    props: {
        house: Object,
        index: Number,
    },
    data () {
        return {
            statusList: [
                {
                    text: "запланирован"
                },
                {
                    text: "начат"
                },
                {
                    text: "окончен"
                }
            ],
            price: 1000,
            defaultValue: "запланирован",
            showAdditionalInfo: false,
        }
    },
    methods: {
        saveSelectedValue(text) {
            this.defaultValue = text;
            this.house.status = text;
            this.saveNewData();
            this.$emit('updated-status');
        },
        hideVariants() {
            this.$root.showVariants = false;
        },
        addSpending(spending, index) {
            console.log(index);
            console.log(spending);
            if (spending.length)
                spending.splice(index + 1,0,{spendingDescription: "", price: ""});
            else spending.push({spendingDescription: "", price: ""});
        },
        deleteCost(spending, index) {
            console.log(index);
            console.log(spending)
            spending.splice(index,1);
        },
        saveNewData() {
            console.log("save");
            window.localStorage.setItem(`house${this.index + 1}`, JSON.stringify(this.house));
        }
    },
    components: {
        mySelector,
        spending,
    },
    // watch: {
    //     house: function() {
    //         console.log("CHANGE")
    //     }
    // }
}
</script>

<style lang="scss" scoped>
    // * {
    //     margin: 0;
    //     padding: 0;
    // }
    %standart {
        float: left;
        width: 100%;
    }
    %alignCenter {
        display: flex;
        justify-content: center;
    }
    .house {
        float: left;
        width: calc(100% - 20px);
        margin: 10px;
        border: 1px solid black;
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
                @extend %standart;
                cursor: pointer;
                @extend %alignCenter;
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
    #ddown-aria {
        // float: left;
        // width: 400px;
        margin-left: 0 !important;
        button {
            font-size: 20px !important;
            line-height: 30px;
        }
    }
    .details {
        @extend %standart;
        position: absolute;
        bottom: 0px;
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
                width: 100%;
                height: 100%;
            }
        }
    }
    .load {
        @extend %standart;
        @extend %alignCenter;
        margin-top: 50px;
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
            display: inline-block;
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
    .add_info-enter-active {
        transition: opacity .7s;
    } 
    .add_info-leave-active {
        transition: opacity .3s;
    }
    .add_info-enter, .add_info-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>
