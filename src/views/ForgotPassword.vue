<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div
            v-if="response.message"
            :class="`rounded-sm bg-${response.color}-100 p-4 mb-4`"
          >
            <h3
              :class="`text-sm leading-5 font-medium text-${response.color}-800`"
            >
              {{ response.message }}
            </h3>
          </div>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >E-mail</label
              >
              <input
                v-model="email"
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="usuario@gmail.com"
                required=""
              />
            </div>
            <button
              :disabled="spinner.forgot"
              @click.stop.prevent="forgotPassword"
              type="button"
              class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                v-if="spinner.forgot"
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              <div v-if="spinner.forgot" class="forgot">Loading...</div>
              <div v-else class="forgot">Recuperar senha</div>
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              J?? tem uma conta?
              <router-link
                to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Login</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { $axios, config } from "@/assets/plugins/axios";
import message from "@/utils/messages";

export default {
  name: "ForgotPassword",

  data() {
    return {
      email: "",
      response: {
        color: "",
        message: "",
      },
      spinner: {
        forgot: false,
      },
    };
  },

  methods: {
    forgotPassword() {
      this.spinner.forgot = true;

      if (!this.email) {
        this.response.color = "red";
        this.response.message = message.emailRequired;
        this.spinner.forgot = false;
        return;
      }

      $axios
        .post(
          "v1/forgot-password",
          {
            email: this.email,
          },
          config
        )
        .then(() => {
          this.resetForm();
          this.response.color = "green";
          this.response.message =
            "Enviamos um e-mail com instru????es, por gentileza verifique!";
          this.spinner.forgot = false;
        })
        .catch((e) => {
          this.spinner.forgot = false;
          const errorCode = e?.response?.data?.error ?? "ServerError";
          this.response.color = "red";
          this.response.message = message[errorCode];
        });
    },

    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    },

    resetForm() {
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
