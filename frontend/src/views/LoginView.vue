<script setup lang="ts">
import {AuthenticationServer} from "@/auth";
import router from "@/router";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import {ref, watch} from "vue";

enum TabChoices {
  LOGIN,
  SIGN_UP
}

const authServer = new AuthenticationServer();

const email = ref<string | null>(null);

const username = ref<string | null>(null);

const email_or_username = ref<string | null>(null)

const password = ref<string | null>(null);

const activeTab = ref<TabChoices>(TabChoices.LOGIN)

function clearForm() {
  email.value = null
  email_or_username.value = null
  username.value = null
  password.value = null
}

async function signUp() {
  if (username.value && email.value && password.value) {
    try {
      await authServer.signUp({email: email.value, password: password.value, username: username.value});
      await login();
    } catch (err: any) {
      console.error(err);
    }
  }
}

async function login() {
  if (email_or_username.value && password.value) {
    try {
      const {jwt} = await authServer.login({email_or_username: email_or_username.value, password: password.value});
      localStorage.setItem("jwt", jwt);
      router.replace({name: "year", params: {year: new Date().getFullYear()}});
    } catch (err: any) {
      console.error(err);
    }
  }
}

watch(activeTab, () => {
  clearForm()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div
        class="flex flex-col gap-14 border-1 border-grays-light-200 p-6 rounded w-[500px] max-w-full max-h-full shadow-lg">
      <h1 class="text-3xl">{{ activeTab === TabChoices.LOGIN ? "Login" : "Sign up" }}</h1>
      <form @submit.prevent="login" class="flex flex-col gap-12">
        <div class="flex flex-col gap-5">
          <template v-if="activeTab === TabChoices.LOGIN">
            <div class="flex flex-col">
              <label for="email_or_username">Email or username</label>
              <InputText v-model="email_or_username" id="email_or_username"/>
            </div>
          </template>
          <template v-if="activeTab === TabChoices.SIGN_UP">
            <div class="flex flex-col">
              <label for="email">Email</label>
              <InputText v-model="email" id="email"/>
            </div>
            <div class="flex flex-col">
              <label for="username">Username</label>
              <InputText v-model="username" id="username"/>
            </div>
          </template>
          <div class="flex flex-col">
            <label for="password">Password</label>
            <InputText v-model="password" id="password" type="password"/>
          </div>
        </div>
        <div class="flex flex-col mt-auto gap-6">
          <template v-if="activeTab === TabChoices.LOGIN">
            <Button label="Login" @click="login" type="submit"/>
            <small class="text-center text-primary-600 select-none hover:underline cursor-pointer"
                   @click="activeTab = TabChoices.SIGN_UP">
              Don't have an account? Sign up instead.
            </small>
          </template>
          <template v-if="activeTab === TabChoices.SIGN_UP">
            <Button label="Sign up" @click="signUp" type="submit"/>
            <small class="text-center text-primary-600 select-none hover:underline cursor-pointer"
                   @click="activeTab = TabChoices.LOGIN">
              Already have an account? Login instead.
            </small>
          </template>
        </div>
      </form>
    </div>
  </div>
</template>
