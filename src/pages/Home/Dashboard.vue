<template>
  <v-card dark class="p-5">
    <v-container>
      <v-row>
        <v-col cols="8" md="8">
          <!-- Search Section -->
          <v-row class="mb-6" align="center">
            <v-col cols="4" md="4">
              <v-text-field
                v-model="search.licensePlate"
                label="Placa"
                maxlength="6"
                type="text"
                dense
                clearable
                @click:clear="cleanFilters"
              />
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="search.brand"
                label="Marca"
                type="text"
                dense
                clearable
                @click:clear="cleanFilters"
              />
            </v-col>
            <v-col cols="4" md="4">
              <v-text-field
                v-model="search.model"
                label="Modelo"
                type="text"
                dense
                clearable
                @click:clear="cleanFilters"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="search.year"
                label="Año"
                maxlength="4"
                type="number"
                :min="0"
                :max="2025"
                dense
                clearable
                @click:clear="cleanFilters"
              />
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="search.mileage"
                label="Kilometraje"
                maxlength="9"
                type="number"
                :min="0"
                dense
                clearable
                @click:clear="cleanFilters"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-btn @click="searchPost" block color="primary" dark
                >Iniciar búsqueda</v-btn
              >
            </v-col>
          </v-row>
        </v-col>

        <v-col class="text-center" cols="4" md="4">
          <img
            class="ml-5 border border-black rounded p-2"
            src="@/assets/img/logo.png"
            alt="autohub"
            height="250"
          />
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
                  <a :href="page.link" target="_blank">
                    <v-card-title
                      class="text-subtitle-1 font-weight-medium pl-4"
                    >
                      {{ page.name.replace(/\b\w/g, (l) => l.toUpperCase()) }}
                    </v-card-title>
                    <v-img :src="page.image" cover> </v-img>
                  </a>
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
      search: {
        licensePlate: "",
        brand: "",
        model: "",
        year: 0,
        mileage: 0,
      },
      links: [],
    };
  },
  methods: {
    searchPost() {
      if (!this.validateSearch()) return;

      this.links = [
        //SUPERBID
        //ATU
        {
          id: 1,
          name: "sunarp",
          pages: [
            {
              id: 11,
              name: "consulta vehicular",
              link: "https://consultavehicular.sunarp.gob.pe/consulta-vehicular/inicio",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/sunarp_consulta_vehicular.png",
            },
            {
              id: 12,
              name: "conoce aqui",
              link: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/sunarp_conoce_aqui.png",
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
                "https://novastoragestaging1.blob.core.windows.net/files/sat_callao.png",
            },
            {
              id: 22,
              name: "pagos lima",
              link: "https://www.sat.gob.pe/pagosenlinea/",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/sat_lima.png",
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
                "https://novastoragestaging1.blob.core.windows.net/files/sutran_record_infracciones.png",
            },
            {
              id: 32,
              name: "verifica infraccion",
              link: "https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/sutran_verifica_infraccion.png",
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
                "https://novastoragestaging1.blob.core.windows.net/files/papeletas_trujillo.png",
            },
            {
              id: 42,
              name: "papeletas ica",
              link: "https://m.satica.gob.pe/consultapapeletas.php",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/papeletas_ica.png",
            },
            {
              id: 43,
              name: "papeletas arequipa",
              link: "https://www.muniarequipa.gob.pe/consulta-de-papeletas/",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/papeletas_arequipa.png",
            },
            {
              id: 44,
              name: "impuesto vehicular arequipa",
              link: "https://muniarequipa.gob.pe/oficina-virtual/impuesto-vehicular.html",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/impuestos_vehicular_arequipa.png",
            },
            {
              id: 45,
              name: "pagos piura",
              link: "https://satp.gob.pe/sistema-pagos/",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/pagos_piura.png",
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
                "https://novastoragestaging1.blob.core.windows.net/files/credito_gas.png",
            },
            {
              id: 52,
              name: "gas gnv",
              link: "https://infogas.com.pe/consulta-placa/",
              image:
                "https://novastoragestaging1.blob.core.windows.net/files/gas_gnv.png",
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
