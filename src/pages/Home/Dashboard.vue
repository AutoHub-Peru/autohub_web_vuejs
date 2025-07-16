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
                      <v-col cols="3" md="3">
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
                      <v-col cols="3" md="3">
                        <v-text-field
                          v-model="search.brand"
                          label="Marca"
                          type="text"
                          dense
                          clearable
                          @click:clear="cleanFilters(search.brand)"
                        />
                      </v-col>
                      <v-col cols="3" md="3">
                        <v-text-field
                          v-model="search.model"
                          label="Modelo"
                          type="text"
                          dense
                          clearable
                          @click:clear="cleanFilters(search.model)"
                        />
                      </v-col>
                      <v-col cols="3" md="3">
                        <v-text-field
                          v-model="search.color"
                          label="Color"
                          type="text"
                          dense
                          clearable
                          @click:clear="cleanFilters(search.color)"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="search.mileage"
                          label="Kilometraje"
                          type="text"
                          maxlength="6"
                          dense
                          suffix="km"
                          clearable
                          :rules="[mileageRule]"
                          @click:clear="cleanFilters(search.mileage)"
                          @input="
                            search.mileage = search.mileage.replace(
                              /[^0-9]/g,
                              ''
                            )
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="search.year"
                          label="Año"
                          type="text"
                          maxlength="4"
                          dense
                          clearable
                          :rules="[yearRule]"
                          @click:clear="cleanFilters(search.year)"
                          @input="
                            search.year = search.year.replace(/[^0-9]/g, '')
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="search.price"
                          label="Precio"
                          type="text"
                          maxlength="12"
                          dense
                          prefix="$"
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(search.price)"
                          @input="
                            this.search.price = $event.target.value
                              .toString()
                              .replace(/,/g, '')
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*)\./g, '$1')
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
                          prefix="S/."
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.impuestoVehicular)"
                          @input="
                            this.costs.impuestoVehicular = $event.target.value
                              .replace(/,/g, '')
                              .replace(/[^0-9.]/g, '')
                              .replace(/^(\d*\.\d{0,2}).*$/, '$1')
                              .replace(/(\..*)\./g, '$1')
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
                          prefix="S/."
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.multasTributarias)"
                          @input="
                            this.costs.multasTributarias = $event.target.value
                              .replace(/,/g, '')
                              .replace(/[^0-9.]/g, '')
                              .replace(/^(\d*\.\d{0,2}).*$/, '$1')
                              .replace(/(\..*)\./g, '$1')
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.papeletas"
                          label="Papeletas"
                          maxlength="7"
                          prefix="S/."
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.papeletas)"
                          @input="
                            this.costs.papeletas = $event.target.value
                              .replace(/,/g, '')
                              .replace(/[^0-9.]/g, '')
                              .replace(/^(\d*\.\d{0,2}).*$/, '$1')
                              .replace(/(\..*)\./g, '$1')
                          "
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.soat"
                          label="Soat"
                          prefix="S/."
                          maxlength="7"
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters(costs.soat)"
                          @input="
                            this.costs.soat = $event.target.value
                              .replace(/,/g, '')
                              .replace(/[^0-9.]/g, '')
                              .replace(/^(\d*\.\d{0,2}).*$/, '$1')
                              .replace(/(\..*)\./g, '$1')
                          "
                        />
                      </v-col>
                      <v-col cols="4" md="4">
                        <v-text-field
                          v-model="costs.gnv"
                          label="GNV"
                          prefix="S/."
                          type="text"
                          dense
                          clearable
                          :rules="[priceRule]"
                          @click:clear="cleanFilters('gnv')"
                          @input="onInputDecimal('gnv', $event)"
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

        <v-col cols="3" md="3" class="d-flex align-center justify-center">
          <div
            style="
              width: 100%;
              height: 250px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <v-img
              v-if="carImageSrc"
              :src="carImageSrc"
              max-height="250"
              max-width="250"
              contain
              class="border border-black rounded p-2"
            />
            <img
              v-else
              src="@/assets/img/logo.png"
              alt="autohub"
              style="max-height: 250px; max-width: 250px"
              class="border border-black rounded p-2"
            />
          </div>
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

export default {
  data() {
    return {
      search: {
        licensePlate: "AAA111",
        brand: "Toyota",
        model: "Supra",
        color: "Rojo",
        year: 2025,
        mileage: 2000,
        price: 50000,
      },
      costs: {
        impuestoVehicular: 200,
        multasTributarias: 200,
        papeletas: 200,
        soat: 200,
        gnv: 200,
      },
      firstLinks: [],
      lastLinks: [],
      years: [],
      activeTab: 0,
      carImageSrc: null,
    };
  },
  methods: {
    cleanFilters(key) {
      if (this.search.hasOwnProperty(key)) {
        this.search[key] = "";
      } else if (this.costs.hasOwnProperty(key)) {
        this.costs[key] = "";
      }
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
    async searchPosts() {
      if (this.activeTab == 0) {
        if (this.isFirstFormValid()) {
          this.activeTab = 1;
          await this.fetchCarImage();
        }
      } else if (this.activeTab == 1) {
        if (this.isLastFormValid()) {
          this.exportToPDF();
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
    onInputDecimal(field, value) {
      console.log(value);
      console.log(typeof value);
      if (typeof value !== "string") value = String(value);

      value = value
        .replace(/,/g, "") // elimina comas
        .replace(/[^0-9.]/g, "") // elimina todo menos números y punto
        .replace(/(\..*)\./g, "$1") // evita múltiples puntos
        .replace(/^(\d*\.\d{0,2}).*$/, "$1"); // máximo 2 decimales

      console.log("value: ", value);

      this.costs[field] = parseFloat(value) || "";
    },
    exportToPDF() {
      const doc = new jsPDF();
      const title = "Reporte del Vehículo";

      // Título centrado
      doc.setFontSize(16);
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(title);
      const x = (pageWidth - textWidth) / 2;
      doc.text(title, x, 24);

      // Subtítulo 1
      doc.setFontSize(13);
      doc.text("Información General", 14, 36);

      // Tabla 1: Información general
      autoTable(doc, {
        startY: 42,
        head: [["Campo", "Valor"]],
        body: Object.entries(this.search || {}).map(([key, value]) => [
          this.formatFieldName(key),
          this.formatKeyValue(key, value),
        ]),
        styles: { fontSize: 10 },
        theme: "grid",
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [52, 73, 94] },
        didDrawPage: (data) => {
          doc.lastAutoTableFinalY = data.cursor.y;
        },
      });

      // Subtítulo 2
      const startY2 = doc.lastAutoTableFinalY + 10;
      doc.setFontSize(13);
      doc.text("Gastos Adicionales", 14, startY2);

      const exchangeRate = this.getExchangeRate();
      const gastosBody = Object.entries(this.costs || {}).map(
        ([key, value]) => {
          const montoPEN = Number(value || 0);
          const montoUSD = montoPEN / exchangeRate;
          return [
            this.formatFieldName(key),
            `$ ${montoUSD.toFixed(2)}`,
            `S/. ${montoPEN.toFixed(2)}`,
          ];
        }
      );

      const totalCostsPEN = Object.values(this.costs).reduce(
        (acc, val) => acc + Number(val || 0),
        0
      );
      const totalCostsUSD = totalCostsPEN / exchangeRate;

      // Fila total
      gastosBody.push([
        { content: "Total", styles: { fontStyle: "bold" } },
        {
          content: `$ ${totalCostsUSD.toFixed(2)}`,
          styles: { fontStyle: "bold" },
        },
        {
          content: `S/. ${totalCostsPEN.toFixed(2)}`,
          styles: { fontStyle: "bold" },
        },
      ]);

      autoTable(doc, {
        startY: startY2 + 4,
        head: [["Concepto", "Monto $", "Monto S/."]],
        body: gastosBody,
        styles: { fontSize: 10 },
        theme: "grid",
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [22, 160, 133] },
        didDrawPage: (data) => {
          doc.lastAutoTableFinalY = data.cursor.y;
        },
      });

      // Subtítulo 3
      const startY3 = doc.lastAutoTableFinalY + 10;
      doc.setFontSize(13);
      doc.text("Resumen de Costos", 14, startY3);

      const priceUSD = Number(this.search.price || 0);
      const pricePEN = priceUSD * exchangeRate;
      const totalVehicleCostPEN = pricePEN + totalCostsPEN;
      const totalVehicleCostUSD = priceUSD + totalCostsUSD;

      // Tabla resumen
      autoTable(doc, {
        startY: startY3 + 4,
        head: [["Concepto", "Monto $", "Monto S/."]],
        body: [
          [
            "Precio de compra",
            `$ ${priceUSD.toFixed(2)}`,
            `S/. ${pricePEN.toFixed(2)}`,
          ],
          [
            "Gastos adicionales",
            `$ ${totalCostsUSD.toFixed(2)}`,
            `S/. ${totalCostsPEN.toFixed(2)}`,
          ],
          [
            { content: "Costo total estimado", styles: { fontStyle: "bold" } },
            {
              content: `$ ${totalVehicleCostUSD.toFixed(2)}`,
              styles: { fontStyle: "bold" },
            },
            {
              content: `S/. ${totalVehicleCostPEN.toFixed(2)}`,
              styles: { fontStyle: "bold" },
            },
          ],
        ],
        styles: { fontSize: 10 },
        theme: "grid",
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [149, 165, 166] },
      });

      doc.save("reporte-vehiculo.pdf");
    },
    formatFieldName(field) {
      const map = {
        licensePlate: "Placa",
        brand: "Marca",
        model: "Modelo",
        year: "Año",
        mileage: "Kilometraje",
        price: "Precio de Compra",
        impuestoVehicular: "Impuesto Vehicular",
        multasTributarias: "Multas Tributarias",
        papeletas: "Papeletas",
        soat: "Soat",
        gnv: "GNV",
      };
      return map[field] || field;
    },
    formatKeyValue(key, field) {
      const map = {
        licensePlate: field,
        brand: field,
        model: field,
        year: "Año",
        mileage: `${field} km`,
        price: `$ ${field}`,
        impuestoVehicular: `S/. ${field}`,
        multasTributarias: `S/. ${field}`,
        papeletas: `S/. ${field}`,
        soat: `S/. ${field}`,
        gnv: `S/. ${field}`,
      };
      return map[key] || field;
    },
    async fetchCarImage() {
      const q = `${this.search.year} ${this.search.brand} ${this.search.model} ${this.search.color}`;
      const res = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: "AIzaSyDtPZnelWfhIWIhsgFXvg52dehEKkFzaA0",
            cx: "e79acdb95f97041d4",
            q,
            searchType: "image",
            num: 1,
          },
        }
      );
      if (res.data && res.data.items && res.data.items.length) {
        this.carImageSrc = res.data.items[0].link;
      }
    },
    getExchangeRate() {
      return 3.6;
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
