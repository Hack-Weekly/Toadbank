<script lang="ts">
    import '../../app.css'
    import { enhance } from "$app/forms";
    import currency_list from "$lib/currency_list.json";
    import currency from "$lib/assets/currency.svg";
    import type { ActionData } from "../$types";
    export let form: ActionData
    const currencies = currency_list


    $: if (form) console.log(form)
</script>
<section class="container mx-auto">
    <div class="flex justify-between items-center gap-12 lg:gap-24 mt-12 min-w-full px-6 lg:px-0">
        <img src={currency} alt="password_illustration" class="hidden lg:block lg:w-2/4 h-auto object-cover">
        <div class="flex flex-col justify-start items-center my-24">
            <h1 class="text-primary font-bold text-5xl mr-auto">Select your currency</h1>
            <p class="font-medium text-dark text-lg w-3/4 text-left mr-auto mt-6">
                In order to use the app, you need to select your perferred currency for your account.
            </p>
            {#if form?.error}
            <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4 mr-auto mt-6 w-full">
                <strong class="block font-medium text-red-800 text-lg"> Something went wrong </strong>
                <p class="mt-2 text-sm text-red-700 text-md">
                    {form.message}
                </p>
            </div>
            {/if}
            <form method="POST" use:enhance class="flex flex-col justify-start items-center w-full mt-8 space-y-6">
                <div class="flex flex-col w-full gap-y-3">
                    <label class="text-primary font-medium text-lg mr-auto" for="currency">Select currency</label>
                    <select class="bg-white text-dark text-md w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-0 mr-auto" name="currency" id="currency">
                        <option class="text-light" disabled selected>Select an option</option>
                        {#each currencies as curr}
                            <option value={curr.code}>{curr.name}</option>
                        {/each}
                    </select>
                </div>
                <button type="submit" class="bg-primary text-white text-xl mt-6 px-6 py-3 rounded-lg ml-auto">Save</button>
            </form>
        </div>
    </div>
</section>
