<template>
  <div>
    <div
      v-if="response.message"
      :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
    >
      <h3 :class="`text-sm leading-5 font-medium text-${response.color}-800`">
        {{ response.message }}
      </h3>
    </div>
  </div>
</template>

<script>
import { $axios, config } from "@/assets/plugins/axios";
import message from "@/utils/messages";

export default {
  data() {
    return {
      token: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        verify_email: false,
      },
    };
  },

  beforeRouteEnter(to, from, next) {
    if (!to?.query?.token) {
      next({ name: "login" });
    }

    next();
  },

  created() {
    this.token = this.$route?.query?.token ?? "";
    this.verifyEmail();
  },

  methods: {
    verifyEmail() {
      $axios
        .post("v1/verify-email", { token: this.token }, config)
        .then((response) => {
          console.log(response.data);
          this.response.color = "green";
          this.response.message = "E-mail verificado com sucesso!";
        })
        .catch((e) => {
          const errorCode = e?.response?.data?.error ?? "ServerError";
          this.response.color = "red";
          this.response.message = message[errorCode];
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
