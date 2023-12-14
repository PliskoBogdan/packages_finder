<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            :value="searchInput"
            label="Search Package"
            @input="debouncedInput"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="packages"
            :loading="isLoading"
            :items-per-page="10"
          >
            <template #item="{ item }">
              <tr class="s" @click="onRowClick(item)" style="cursor: pointer">
                <td>{{ item.name }}</td>
                <td>{{ item.author }}</td>
                <td>{{ item.lastversion }}</td>
                <td>{{ item.meta.created | formattedDate }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ selectedPackage.name }}
          </v-card-title>

          <v-card-text>
            <div v-for="property in dialogDetailsFields">
              <template v-if="isTagsProperty(property)">
                <v-row>
                  <v-col cols="2">
                    <h4>{{ property }}:</h4>
                  </v-col>
                  <v-col cols="10">
                    <div v-for="(tag, tagKey) in selectedPackage[property]">
                      <span
                        ><b>{{ tagKey }}:</b>
                      </span>
                      <span>
                        {{ tag }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </template>
              <template v-else>
                <v-row>
                  <v-col cols="3">
                    <h4>{{ property }}:</h4>
                  </v-col>
                  <v-col cols="9">
                    <span>
                      {{ selectedPackage[property] }}
                    </span>
                  </v-col>
                </v-row>
              </template>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

import debounce from "@/utils/debounce";

interface PackageEntity {
  author: string;
  name: string;
  description?: string;
  github?: string;
  homepage?: string;
  lastversion?: string;
  versions?: string[];
  tags?: {
    alpha: string;
    beta: string;
    csp: string;
    latest: string;
    legacy: string;
    next: string;
    "v2-latest": string;
    "v2-beta": string;
    "v2-alpha": string;
  };
  meta?: {
    created: number;
  };
}

type DialogDetails = keyof Omit<PackageEntity, "meta">;

enum DialogDetailsFields {
  author = "author",
  name = "name",
  description = "description",
  github = "github",
  homepage = "homepage",
  lastversion = "lastversion",
  versions = "versions",
  tags = "tags",
}

@Component
export default class MainContainer extends Vue {
  debouncedInput: any = () => ({});
  searchInput: string = "";
  packages: PackageEntity[] = [];
  selectedPackage: PackageEntity = {
    author: "",
    name: "",
  };
  isLoading: boolean = false;
  dialog: boolean = false;
  headers = [
    {
      text: "Name",
      value: "name",
    },
    {
      text: "Author",
      value: "author",
    },
    {
      text: "Last version",
      value: "lastversion",
      sortable: false,
    },
    {
      text: "Created",
      value: "created",
    },
  ];

  created(): void {
    this.debouncedInput = debounce(this.searchPackages, 300);
  }

  get dialogDetailsFields(): Array<DialogDetails> {
    const fields = Object.values(DialogDetailsFields);
    return fields;
  }

  async searchPackages(value: string): Promise<void> {
    try {
      this.isLoading = true;
      if (value === "") {
        alert("Please enter a package name.");
        return;
      }

      this.searchInput = value;

      const { data } = await axios.get(
        `http://api.jsdelivr.com/v1/jsdelivr/libraries?name=${value}`
      );

      this.packages = data;
    } catch (error) {
      console.error("Error in package search");
    } finally {
      this.isLoading = false;
    }
  }

  async onRowClick(item: PackageEntity): Promise<void> {
    const { data } = await axios.get(
      `https://data.jsdelivr.com/v1/package/npm/${item.name}`
    );
    this.selectedPackage = { ...item, tags: data.tags };
    this.dialog = true;
  }

  isTagsProperty(property: DialogDetails): boolean {
    return property === DialogDetailsFields.tags;
  }

  isUrl(value: any): boolean {
    if (typeof value !== 'string') {
      return false
    }

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    return urlRegex.test(value);
  }
}
</script>
