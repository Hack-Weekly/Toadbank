<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData

    $: if (form) console.log(form)
</script>
<section class="mt-12">
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col">
            <h2 class="text-dark text-xl font-semibold md:text-2xl">Contacts</h2>
            <p class="text-md text-light font-medium md:text-lg">An overview of all your saved contacts</p>
        </div>
        <a href="/transactions/new-transaction" class="bg-primary hover:bg-primary/95 rounded-md px-3 py-2 text-white transition duration-150 ease-in-out">Add contact</a>
    </div>
    <div class="mt-5 flex flex-col overflow-scroll md:overflow-hidden">
        <div class="text-light flex flex-row justify-between font-semibold">
            <span class="w-full">Name</span>
            <span class="w-full">IBAN</span>
            <span class="w-full">Dated added</span>
            <span class="w-full">Action</span>
        </div>
        {#each {length: 4} as _, i}
        <div class="mt-5 flex flex-row justify-between items-center">
            
            <div class="flex w-full gap-x-3">
                <img class="h-11 w-11 rounded-full object-cover" src="https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar" />
                <div class="flex flex-col">
                    <span class="text-md text-dark font-bold">Hessel</span>
                </div>
            </div>
            <div class="text-dark w-full font-semibold">NL57 5678 5543 7890 4321</div>
            <div class="flex w-full flex-col">
                <span class="text-dark font-semibold">Oct 18, 2023</span>
                <span class="text-light">8:45 am</span>
            </div>
            <a href="" class="text-primary w-full">Edit</a>
        </div>
        {/each}
    </div>
</section>
