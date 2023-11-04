<script lang="ts">
    import { enhance } from "$app/forms";
    import image from "$lib/assets/online_payment.jpg" 
    import type { ActionData } from "../$types";
  
    export let form: ActionData
  
    $: if (form) console.log(form)
  </script>
  
  <section class="min-w-full min-h-screen flex bg-white">
      <div class="flex justify-center items-center lg:items-start w-full lg:w-2/3">
          <div class="flex flex-col my-32">
              <h1 class="font-medium text-dark text-5xl text-center">Login to your account</h1>
              {#if form?.error}
              <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4 mt-3">
                  <strong class="block font-medium text-red-800"> Something went wrong </strong>
                  <p class="mt-2 text-sm text-red-700">
                      {form.message}
                  </p>
              </div>
              {/if}
              <form method="post" use:enhance class="mt-6 space-y-6">
                  <div class="flex flex-col gap-y-1">
                      <label class="font-medium text-md" for="email">Email</label>
                      <input type="email" name="email" placeholder="johndoe@gmail.com" class="px-3 py-2.5 rounded-md border border-lighter-200 shadow-input placeholder-lighter-200">
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label class="font-medium text-md" for="password">Password</label>
                      <input type="password" name="password" placeholder="**************" class="px-3 py-2.5 rounded-md border border-lighter-200 shadow-input placeholder-lighter-200">
                  </div>
                  <div class="flex justify-between items-center">
                      <span class="text-md text-dark">Don't have an account?<a href="/auth/register" class="text-primary font-bold ml-1">Register</a></span>
                      <button type="submit" class="bg-primary text-white px-6 py-2.5 rounded-md hover:bg-primary/95 transition ease-in-out duration-150">Login</button>
                  </div>
              </form>
          </div>
      </div>
      <img src={image} class="hidden lg:block w-2/4 h-screen object-cover" alt="online_payment">
  </section>
  
  