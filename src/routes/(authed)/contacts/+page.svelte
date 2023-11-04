<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageServerData } from "./$types";

    export let data: PageServerData

    let contacts: Array<null>;
    if(data.contacts) {

        contacts = data.contacts;
    }

    function formatDate(time: string) {
            const date = new Date(time);

            const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
            let formattedDate = date.toLocaleDateString('en-US', dateOptions);

            return formattedDate;
        }

    function formatTime(time: string) {
        const date = new Date(time);

        const timeOptions = { hour: 'numeric', minute: 'numeric' };
        let formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return formattedTime;
    }
    
</script>
<section class="mt-12">
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col">
            <h2 class="text-dark text-xl font-semibold md:text-2xl">Contacts</h2>
            <p class="text-md text-light font-medium md:text-lg">An overview of all your saved contacts</p>
        </div>
        <a href="/transactions/new-transaction" class="bg-primary hover:bg-primary/95 rounded-md px-3 py-2 text-white transition duration-150 ease-in-out">Add contact</a>
    </div>
    {#if contacts.length > 0}
    <div class="mt-5 flex flex-col overflow-scroll md:overflow-hidden">
        <div class="text-light flex flex-row justify-between font-semibold">
            <span class="w-full">Name</span>
            <span class="w-full">IBAN</span>
            <span class="w-full">Dated added</span>
            <span class="w-full">Action</span>
        </div>
        {#each contacts as contact}
        <div class="mt-5 flex flex-row justify-between items-center">
            
            <div class="flex w-full items-center gap-x-3">
                <img class="h-11 w-11 rounded-full object-cover" src="https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar" />
                <div class="flex flex-col">
                    <span class="text-md text-dark font-bold">{contact?.name}</span>
                </div>
            </div>
            <div class="text-dark w-full font-semibold">NL57 5678 5543 7890 4321</div>
            <div class="flex w-full flex-col">
                <span class="text-dark font-semibold">{formatDate(contact?.created_at)}</span>
                <span class="text-light">{formatTime(contact?.created_at)}</span>
            </div>
            <a href="/contacts/edit/{contact?.slug}" class="text-primary w-full">Edit</a>
        </div>
        {/each}
    </div>
    {/if}
</section>
