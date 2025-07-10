<template>
  <v-card dark class="p-5">
    <v-container>
      <v-row>
        <v-col cols="9" md="9">
          <v-tabs centered dark v-model="activeTab">
            <v-tab tabindex="0"> Información General </v-tab>
            <v-tab tabindex="1"> Gastos Adicionales </v-tab>

            <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
              <v-card flat dark>
                <v-row class="mt-2">
                  <v-col>
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
                          :rules="[licensePlateRule]"
                          @click:clear="cleanFilters(search.licensePlate)"
                          @input="
                            search.licensePlate =
                              search.licensePlate.toUpperCase()
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="search.brand"
                          label="Marca"
                          type="text"
                          dense
                          clearable
                          @click:clear="cleanFilters(search.brand)"
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="search.model"
                          label="Modelo"
                          type="text"
                          dense
                          clearable
                          @click:clear="cleanFilters(search.model)"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model.number="search.mileage"
                          label="Kilometraje"
                          type="text"
                          maxlength="6"
                          dense
                          clearable
                          :rules="[mileageRule]"
                          @click:clear="cleanFilters(search.mileage)"
                          @input="
                            this.search.mileage = $event.target.value.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model.number="search.year"
                          label="Año"
                          type="text"
                          maxlength="4"
                          dense
                          clearable
                          :rules="[yearRule]"
                          @click:clear="cleanFilters(search.year)"
                          @input="
                            this.search.year = $event.target.value.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model.number="search.price"
                          label="Precio"
                          type="text"
                          maxlength="12"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(search.price)"
                          @input="
                            this.search.price = $event.target.value.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>

            <v-tab-item style="background-color: #1e1e1e; padding-top: 1rem">
              <v-card flat dark>
                <v-row class="mt-2">
                  <v-col>
                    <!-- Search Section -->
                    <v-row class="mb-6" align="center">
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.impuestoVehicular"
                          label="Impuesto Vehicular"
                          maxlength="7"
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.impuestoVehicular)"
                          @input="
                            this.costs.impuestoVehicular =
                              $event.target.value.replace(/[^0-9]/g, '')
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.multasTributarias"
                          label="Multas Tributarias"
                          maxlength="7"
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.multasTributarias)"
                          @input="
                            this.costs.multasTributarias =
                              $event.target.value.replace(/[^0-9]/g, '')
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.papeletas"
                          label="Papeletas"
                          maxlength="7"
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.papeletas)"
                          @input="
                            this.costs.papeletas = $event.target.value.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.soat"
                          label="Soat"
                          maxlength="7"
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.soat)"
                          @input="
                            this.costs.soat = $event.target.value.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.gnv"
                          label="GNV"
                          maxlength="7"
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.gnv)"
                          @input="
                            this.costs.gnv = $event.target.value.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4"> </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <v-row>
            <v-col cols="12" md="12" class="mt-4">
              <v-btn @click="searchPosts" block color="primary" dark
                >{{ btnText }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="text-center" cols="3" md="3">
          <img
            class="border border-black rounded p-2"
            src="@/assets/img/logo.png"
            alt="autohub"
            height="250"
          />
        </v-col>
      </v-row>

      <!-- Links Section -->
      <v-row dense>
        <v-col v-for="link in firstLinks" :key="link.id" cols="12" class="mb-6">
          <v-card outlined color="#1e1e1e">
            <v-divider class="mb-4"></v-divider>
            <v-row dense>
              <v-col
                v-for="page in link.pages"
                :key="page.id"
                cols="12"
                md="3"
                class="p-4"
              >
                <v-card color="#2c2c2c">
                  <a :href="page.link" target="_blank">
                    <v-img :src="page.image" cover> </v-img>
                  </a>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col v-for="link in lastLinks" :key="link.id" cols="12" class="mb-6">
          <v-card outlined color="#1e1e1e">
            <!-- <v-divider class="mb-4"></v-divider> -->
            <v-row dense>
              <v-col
                v-for="page in link.pages"
                :key="page.id"
                cols="12"
                md="2"
                class="p-4"
              >
                <v-card color="#2c2c2c">
                  <a :href="page.link" target="_blank">
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
        licensePlate: "AAA111",
        brand: "",
        model: "",
        year: 2025,
        mileage: 0,
        price: 0,
      },
      costs: {
        impuestoVehicular: 0,
        multasTributarias: 0,
        papeletas: 0,
        soat: 0,
        gnv: 0,
      },
      firstLinks: [],
      lastLinks: [],
      years: [],
      activeTab: 0,
    };
  },
  methods: {
    cleanFilters(item) {
      this.search[item] = "";
      this.firstLinks = [];
      this.lastLinks = [];
    },
    validateSearch() {
      const plate = this.search.licensePlate;
      if (!plate || plate.trim().length !== 6) {
        this.$notify({
          title: "La placa debe tener exactamente 6 caracteres",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        return false;
      }
      return true;
    },
    getPosts() {
      this.firstLinks = [
        {
          id: 1,
          name: "sunarp",
          pages: [
            {
              id: 11,
              name: "conoce aqui",
              link: "https://conoce-aqui.sunarp.gob.pe/conoce-aqui/inicio",
              image: require("@/assets/img/sunarp_conoce_aqui.png"),
            },
            {
              id: 12,
              name: "consulta vehicular",
              link: "https://consultavehicular.sunarp.gob.pe/consulta-vehicular/inicio",
              image: require("@/assets/img/sunarp_consulta_vehicular.png"),
            },
            {
              id: 13,
              name: "siguelo plus",
              link: "https://sigueloplus.sunarp.gob.pe/siguelo/",
              image: require("@/assets/img/siguelo_plus.png"),
            },
            {
              id: 14,
              name: "soat",
              link: "https://www.soat.com.pe/servicios-soat/",
              image: require("@/assets/img/soat.png"),
            },
          ],
        },
      ];

      this.lastLinks = [
        {
          id: 2,
          name: "sat",
          pages: [
            {
              id: 21,
              name: "pagos lima",
              link: "https://www.sat.gob.pe/pagosenlinea/",
              image: require("@/assets/img/sat_lima.png"),
            },
            {
              id: 22,
              name: "papeletas callao",
              link: "https://pagopapeletascallao.pe/",
              image: require("@/assets/img/sat_callao.png"),
            },
            {
              id: 23,
              name: "atu",
              link: "https://sistemas.atu.gob.pe/consultavehiculo",
              image: require("@/assets/img/atu.png"),
            },
            {
              id: 24,
              name: "record infracciones",
              link: "https://www.sutran.gob.pe/consultas/record-de-infracciones/record-de-infracciones/",
              image: require("@/assets/img/sutran_record_infracciones.png"),
            },
            {
              id: 25,
              name: "verifica infraccion",
              link: "https://www.sutran.gob.pe/consultas/record-de-infracciones/verifica-tu-infraccion/",
              image: require("@/assets/img/sutran_verifica_infraccion.png"),
            },
          ],
        },
        // {
        //   id: 4,
        //   name: "sat provincia",
        //   pages: [
        //     {
        //       id: 41,
        //       name: "papeletas trujillo",
        //       link: "https://satt.gob.pe/servicios/record-de-infracciones",
        //       image: require("@/assets/img/papeletas_trujillo.png"),
        //     },
        //     {
        //       id: 42,
        //       name: "papeletas ica",
        //       link: "https://m.satica.gob.pe/consultapapeletas.php",
        //       image: require("@/assets/img/papeletas_ica.png"),
        //     },
        //     {
        //       id: 43,
        //       name: "papeletas arequipa",
        //       link: "https://www.muniarequipa.gob.pe/consulta-de-papeletas/",
        //       image: require("@/assets/img/papeletas_arequipa.png"),
        //     },
        //     {
        //       id: 44,
        //       name: "impuesto vehicular arequipa",
        //       link: "https://muniarequipa.gob.pe/oficina-virtual/impuesto-vehicular.html",
        //       image: require("@/assets/img/impuestos_vehicular_arequipa.png"),
        //     },
        //     {
        //       id: 45,
        //       name: "pagos piura",
        //       link: "https://satp.gob.pe/sistema-pagos/",
        //       image: require("@/assets/img/pagos_piura.png"),
        //     },
        //   ],
        // },
        {
          id: 5,
          name: "gas",
          pages: [
            {
              id: 51,
              name: "fise",
              link: "https://rec.mtc.gob.pe/Citv/ArConsultaCitv",
              image: require("@/assets/img/revision_tecnica_vehicular.png"),
            },
            {
              id: 52,
              name: "sbs",
              link: "https://servicios.sbs.gob.pe/reportesoat/",
              image: require("@/assets/img/sbs.png"),
            },
            {
              id: 53,
              name: "sigm",
              link: "https://sigm.sunarp.gob.pe/garantias-mobiliarias/inicio",
              image: require("@/assets/img/sigm.png"),
            },
            {
              id: 54,
              name: "impuesto vehicular",
              link: "https://servicios.sbs.gob.pe/reportesoat/",
              image: require("@/assets/img/sbs.png"),
            },
            {
              id: 55,
              name: "fise",
              link: "https://fise.minem.gob.pe:23308/consulta-taller/pages/consultaTaller/inicio",
              image: require("@/assets/img/credito_gas.png"),
            },
            {
              id: 56,
              name: "gas gnv",
              link: "https://infogas.com.pe/consulta-placa/",
              image: require("@/assets/img/gas_gnv.png"),
            },
          ],
        },
      ];
    },
    searchPosts() {
      if (this.activeTab == 0) {
        if (this.isFirstFormValid()) {
          this.activeTab = 1;
        }
      } else if (this.activeTab == 1) {
        if (this.isLastFormValid()) {
          const value = [...this.search, ...this.costs];
          this.$notify({
            title: "Los datos han sido guardados exitosamente.",
            icon: "fa-solid fa-circle-exclamation",
            horizontalAlign: "center",
            verticalAlign: "top",
            type: "success",
          });
        }
      }
    },
    isFirstFormValid() {
      const fields = [
        this.licensePlateRule(this.search.licensePlate),
        this.yearRule(this.search.year),
        this.mileageRule(this.search.mileage),
        this.priceRule(this.search.price),
      ];

      const allValid = fields.every((f) => f === true);
      if (!allValid) {
        this.$notify({
          title:
            "Completa correctamente todos los campos requeridos antes de continuar",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
      }
      return allValid;
    },
    isLastFormValid() {
      const fields = [
        this.priceRule(this.costs.impuestoVehicular),
        this.priceRule(this.costs.multasTributarias),
        this.priceRule(this.costs.papeletas),
        this.priceRule(this.costs.soat),
        this.priceRule(this.costs.gnv),
      ];

      const allValid = fields.every((f) => f === true);
      if (!allValid) {
        this.$notify({
          title:
            "Completa correctamente todos los campos requeridos antes de guardar",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
      }
      return allValid;
    },
  },
  computed: {
    licensePlateRule() {
      return (v) => {
        if (!v) return "La placa es requerida";
        if (!/^[A-Z0-9]+$/.test(v))
          return "Solo se permiten letras mayúsculas y números";
        if (!/[A-Z]/.test(v))
          return "Debe contener al menos una letra mayúscula";
        if (!/[0-9]/.test(v)) return "Debe contener al menos un número";
        if (v.length !== 6)
          return "La placa debe tener exactamente 6 caracteres";
        return true;
      };
    },
    yearRule() {
      return (v) => {
        const currentYear = new Date().getFullYear();
        if (!v) return "El año es requerido";
        if (!Number.isInteger(v)) return "El año debe ser un número";
        if (v < 1990) return "El año no puede ser menor a 1990";
        if (v > currentYear)
          return `El año no puede ser mayor a ${currentYear}`;
        return true;
      };
    },
    mileageRule() {
      return (v) => {
        if (v === null || v === undefined || v === "")
          return "El kilometraje es requerido";
        if (!Number.isInteger(v)) return "El kilometraje debe ser un número";
        if (v < 0) return "El kilometraje no puede ser negativo";
        if (v > 999999) return "El kilometraje no puede ser mayor a 999999";
        return true;
      };
    },
    priceRule() {
      return (v) => {
        if (v === null || v === undefined || v === "")
          return "Este campo es requerido";
        if (v < 0) return "No puede ser negativo";
        if (v == 0) return "Debe ser mayor a 0";
        // if (!Number.isInteger(v)) return "Debe ser un número";
        return true;
      };
    },
    btnText() {
      return this.activeTab === 0 ? "Continuar" : "Guardar Gastos";
    },
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    activeTab(newVal, oldVal) {
      if (newVal === 1 && !this.isFirstFormValid()) {
        this.activeTab = 0;
      }
    },
  },
};
</script>
