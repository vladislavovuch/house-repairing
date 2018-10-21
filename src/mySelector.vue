<template>
    <!-- 
        ОБОВЯЗКОВО в parent
        listVariants - список який буде в селекті
        @select-value - подія для прослуховування зміни selectedValue
        defaultValue - значення по замовчуванню  
    -->
    <!-- <div class=" standart " :class="[this.$root.showVariants && myFlag ? 'my_selector' : '']">
        <div class="selected_item standart" @click.stop="toggleVariants" :style="{ backgroundColor:myBackGroundColor}">
            <div class="selected_item_text standart">
                <span :style="{color: myColor}">{{defaultValue}}</span>
            </div>
            <div class="selected_item_svg">
                <span class="arrow_down" :style="{color: myColor}"><svg aria-hidden="true" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg></span>
            </div>
        </div>
        <div class="selected_variants standart" v-if="this.$root.showVariants && myFlag">
           
            <ul @click.stop="toggleVariants">
                <li v-for="(elem, index) in listVariants" :class="[elem.text == defaultValue ? 'my_checked' : '']"
                :key="index" :id="index" @click="$emit('select-value',elem.text)">
                    {{elem.text}}
                </li>
            </ul>
        </div>
    </div> -->
    <div>
        <b-dropdown id="ddown-aria" :text="defaultValue" variant="primary" class="m-2">
            <b-dropdown-item-button aria-describedby="header1" 
            v-for="(elem, index) in listVariants"
            :key="index" 
            :id="index" 
            @click="$emit('select-value',elem.text)">{{elem.text}}</b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    data() {
        return {
           currentShow: false,
           myFlag: false
        }
    },
    props: {
        listVariants: Array,
        defaultValue: String,
        myBackGroundColor: String,
        myColor: String,
    },
    computed: {
        selectedVariant() {
            return this.$root.selectedVariant;
        }
    },
    methods: {
        changeSelectedItem(index) {
            this.defaultValue = this.listVariants[index].text;
        },
        toggleVariants() {
            // this.$root.showVariants = !this.$root.showVariants;
            this.myFlag = !this.myFlag;
        }
    }
}
</script>

<style lang="scss" scoped>
    /* *{
        margin: 0px;
        padding: 0px;
        border: none;
        background-color: transparent;
        font-size: 22px;
    } */
    #ddown-aria {
        // float: left;
        // width: 400px;
        margin-left: 0 !important;
        button {
            font-size: 20px !important;
            line-height: 30px;
        }
    }
    .my_selector {
        box-shadow: 3px 3px rgb(173, 171, 171);
    }
    .standart {
        width: 100%;
        float: left;
    }
    .selected_item {
        height: 45px;
        background-color: white;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        display: flex;
        border: 1px solid grey;
    }
    .selected_item span {
        text-align: center;
        line-height: 40px;
    }
    li {
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        user-select: none;
    }
    li:hover {
        cursor: pointer;
        background-color: #d4d4d4;
       
    }
    .my_selector {
        position: relative;
         
    }
    .selected_variants {
        position: absolute;
        background-color: white;
        margin-top: 44px;
        box-shadow: 3px 3px rgb(173, 171, 171); 
        border: 1px solid grey;
        z-index: 1000;
    }
    /* .my_line {
        border: 1px solid rgb(230, 227, 227);
        height: 1px;
    } */
    .my_checked {
        background-color: #58b957;
        color: white;
    }
    .arrow_down {
        float: right;
        margin-right: 10px;
        color: rgb(180, 180, 180);
        width: 10px;
    }
    .selected_item_text {
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .selected_item_svg {
        width: 100%;
        float: right;
        max-width: 15px;
    }
</style>
