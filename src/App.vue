<template>
  <v-app>
    <v-app-bar app dark></v-app-bar>

    <MainContainer />

    <CFooter />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import MainContainer from "@/views/MainContainer.vue";
import CFooter from "@/components/CFooter.vue";

export default Vue.extend({
  name: "App",

  components: {
    CFooter,
    MainContainer,
  },
});
</script>

<styles lang="scss">
@import url("@/assets/styles/index.scss");
</styles>
