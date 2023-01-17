<template>
    <router-view/>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Index",
    computed: {
        ...mapState([]),
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>
