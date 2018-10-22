<template>
    <div class="wrap">
        <div class="spending_money" v-if="spending.length !== 0">
            <!-- name -->
            <div class="spending_money_wrap">
                <div class="material">
                    <span>Витрата: </span>
                    <b-form-input v-model="cost.spendingDescription" @input="$emit('save')"></b-form-input>
                </div>
                <!-- price -->
                <div class="price">
                    <span>Ціна:</span>
                    <b-form-input v-model="cost.price" @input="$emit('save')"></b-form-input>
                </div>
            </div>
            <div class="control_buttons" @click="$emit('save')">
                <b-button class="add" variant="success" @click="addSpending(spending, costIndex)">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                    </svg>
                </b-button>
                <b-button class="delete" variant="danger" @click="deleteCost(spending, costIndex)">
                    <svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                        <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                    </svg>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cost: Object,
        costIndex: Number,
        spending: Array
    },
    methods: {
        addSpending(spending, index) {
            console.log(index);
            console.log(spending);
            if (spending.length)
                spending.splice(index + 1,0,{spendingDescription: "", price: ""});
            else spending.push({spendingDescription: "", price: ""});
            // this.$refs.myForm.style.height = "auto";
        },
        deleteCost(spending, index) {
            console.log(index);
            console.log(spending)
            if (spending.length > 1) {
                spending.splice(index,1);
            }
            else {
                spending[0].spendingDescription = "";
                spending[0].price = "";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrap {
        width: 100%;
        float:left;
    }
</style>
