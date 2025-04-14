<template>
  <v-card dark class="p-5">
    <v-container>
      <!-- Search Section -->
      <v-row class="mb-6" align="center">
        <v-col cols="10" md="10">
          <v-text-field
            v-model="search"
            label="Busca por placa"
            maxlength="6"
            type="text"
            dense
            clearable
            @click:clear="cleanFilters"
          />
        </v-col>

        <v-col cols="2" md="2">
          <v-btn @click="searchPost" block color="primary" dark>Buscar</v-btn>
        </v-col>
      </v-row>

      <!-- Links Section -->
      <v-row dense>
        <v-col v-for="link in links" :key="link.id" cols="12" class="mb-6">
          <v-card outlined color="#1e1e1e">
            <v-card-title class="font-weight-bold text-white pb-0">
              {{ link.name.toUpperCase() }}
            </v-card-title>
            <v-divider class="mb-4"></v-divider>
            <v-row dense>
              <v-col
                v-for="page in link.pages"
                :key="page.id"
                cols="12"
                md="6"
                class="p-4"
              >
                <v-card color="#2c2c2c">
                  <v-card-title class="text-subtitle-1 font-weight-medium pl-4">
                    {{ page.name.replace(/\b\w/g, (l) => l.toUpperCase()) }}
                  </v-card-title>
                  <v-img :src="page.image" cover> </v-img>
                  <v-card-text>
                    <a
                      :href="page.link"
                      target="_blank"
                      class="text-truncate pl-2"
                    >
                      {{ truncateText(page.link) }}
                    </a>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      links: [],
    };
  },
  methods: {
    searchPost() {
      if (!this.validateSearch()) return;

      this.links = [
        {
          id: 1,
          name: "sunarp",
          pages: [
            {
              id: 11,
              name: "consulta vehicular",
              link: "https://consultavehicular.sunarp.gob.pe/consulta-vehicular/inicio",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 12,
              name: "conoce aqui",
              link: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
          ],
        },
        {
          id: 2,
          name: "sat",
          pages: [
            {
              id: 21,
              name: "papeletas callao",
              link: "https://pagopapeletascallao.pe/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 22,
              name: "pagos lima",
              link: "https://www.sat.gob.pe/pagosenlinea/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
          ],
        },
        {
          id: 3,
          name: "sutran",
          pages: [
            {
              id: 31,
              name: "record infracciones",
              link: "https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 32,
              name: "verifica infraccion",
              link: "https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
          ],
        },
        {
          id: 4,
          name: "sat provincia",
          pages: [
            {
              id: 41,
              name: "papeletas trujillo",
              link: "https://satt.gob.pe/servicios/record-de-infracciones",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 42,
              name: "papeletas ica",
              link: "https://m.satica.gob.pe/consultapapeletas.php",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 43,
              name: "papeletas arequipa",
              link: "https://www.muniarequipa.gob.pe/consulta-de-papeletas/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 44,
              name: "impuesto vehicular arequipa",
              link: "https://muniarequipa.gob.pe/oficina-virtual/impuesto-vehicular.html",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 45,
              name: "pagos piura",
              link: "https://satp.gob.pe/sistema-pagos/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
          ],
        },
        {
          id: 5,
          name: "gas",
          pages: [
            {
              id: 51,
              name: "credito gas",
              link: "https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
            {
              id: 52,
              name: "gas gnv",
              link: "https://infogas.com.pe/consulta-placa/",
              image:
                "https://www.consultavehicular.pe/wp-content/uploads/2019/06/Consulta-vehicular-por-placa.jpg",
            },
          ],
        },
      ];
    },
    validateSearch() {
      if (!this.search || this.search.trim() === "") {
        this.$notify({
          title: "Ingrese una placa válida",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return false;
      }
      if (this.search.length < 6) {
        this.$notify({
          title: "La placa debe contener 6 caracteres",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return false;
      }
      return true;
    },
    cleanFilters() {
      this.search = "";
      this.links = [];
    },
    truncateText(text) {
      return text.length > 65 ? text.slice(0, 65) + "..." : text;
    },
  },
};
</script>
