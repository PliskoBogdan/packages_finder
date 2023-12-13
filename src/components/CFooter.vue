<template>
  <v-footer dark >
    <v-card flat tile class="lighten-1 white--text text-center full-width">
      <v-card-text class="pt-0">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
          @click="onLinkClick(icon)"
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">A little fact about the creator of this app, he loves 4 cheese pizza</v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        Creator — <strong>Bohdan Plisko</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class CFooter extends Vue {
  icons: string[] = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram'
  ];

  onLinkClick (link: string): void {
    const hrefByLink: Record<string, string> = {
      'mdi-facebook': 'https://www.facebook.com',
      'mdi-twitter': 'https://twitter.com',
      'mdi-linkedin': 'https://www.linkedin.com/in/bohdan-antoshka-272a681b7/',
      'mdi-instagram': 'https://www.instagram.com/'
    }

    window.location.href = hrefByLink[link]
  }
}
</script>
