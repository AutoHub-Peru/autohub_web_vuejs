<template>
  <card class="card" dark>
    <div style="margin: 3rem 4rem">
      <v-form @submit.prevent v-model="isValid">
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              disabled
              type="text"
              label="Email"
              placeholder="Email"
              v-model="user.email"
            >
            </v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              type="text"
              label="Nombres"
              placeholder="Nombres"
              v-model="user.firstName"
            >
            </v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              type="text"
              label="Apellidos"
              placeholder="Apellidos"
              v-model="user.lastName"
            >
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              type="text"
              label="Teléfono"
              placeholder="Teléfono"
              v-model="user.phoneNumber"
              maxlength="9"
            >
            </v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              type="identification"
              label="DNI"
              placeholder="DNI"
              v-model="user.identificationNumber"
            >
            </v-text-field>
          </div>
        </div>

        <div class="text-center" style="margin-top: 5rem">
          <v-btn
            @click="updateProfile()"
            block
            :disabled="!isValid"
            style="margin: 1rem 0rem; background-color: #444654"
          >
            Actualizar Perfil
          </v-btn>
        </div>
        <!-- <v-card-actions>
          <v-btn
            @click="updatePassword()"
            block
            style="border-radius: 10px"
            class="mx-auto"
            dark
            text
            color="#fff"
            >Actualizar contraseña</v-btn
          >
        </v-card-actions> -->
      </v-form>
    </div>
  </card>
</template>
<script>
import UserService from "@/services/user.service";
export default {
  data() {
    return {
      show: false,
      isValid: true,
      user: {
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        identificationType: "",
        identificationNumber: "",
        phoneNumber: "",
      },
      phoneNumberRules: [
        (v) => !!v || "Teléfono es requerido",
        (v) => !/(?=.*[A-Z])/.test(v) || "No puede contener letras",
        (v) => !/(?=.*[a-z])/.test(v) || "No puede contener letras",
        (v) =>
          !/([!@#$*/?¡¿%])/.test(v) ||
          "No puede contener caracteres especiales [!@#$%]",
        (v) => (v && v.length === 9) || "Debe tener 9 números",
      ],
      emailRules: [
        (v) => !!v || "Email es requerido",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail inválido.",
      ],
      passwordRules: [
        (v) => !!v || "Contraseña es requerido",
        // (v) =>
        //   /(?=.*[A-Z])/.test(v) || "La contraseña debe contener una mayúscula",
        // (v) =>
        //   /(?=.*[a-z])/.test(v) || "La contraseña debe contener una minúscula",
        // (v) =>
        //   /([!@#$*/?¡¿%])/.test(v) ||
        //   "La contraseña debe contener caracteres especiales [!@#$%]",
        // (v) =>
        //   /([1-9])/.test(v) || "La contraseña debe contener al menos un número",
        // (v) => (v && v.length >= 8) || "Debe contener como mínimo 8 caracteres",
      ],
    };
  },
  methods: {
    async updateProfile() {
      try {
        await UserService.updateUser(this.user);
        this.$notify({
          title: "Su información se ha actualizado correctamente.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success",
        });
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al editar la información de su perfil. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error);
      }
    },
    async getUser() {
      try {
        const user = await UserService.me();
        this.user.id = user.data.id;
        this.user.email = user.data.email;
        this.user.firstName = user.data.firstName;
        this.user.lastName = user.data.lastName;
        this.user.identificationType = user.data.identificationType;
        this.user.identificationNumber = user.data.identificationNumber;
        this.user.phoneNumber = user.data.phoneNumber;
      } catch (error) {
        this.$notify({
          title:
            "Ha ocurrido un problema al obtener la información de su perfil. Intentalo nuevamente en unos minutos.",
          icon: "fa-solid fa-circle-exclamation",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "warning",
        });
        console.log(error.status);
      }
    },
    updatePassword() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/reset-password");
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getUser();
  },
};
</script>
<style></style>
