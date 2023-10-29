<script lang="ts">

    import { fade } from 'svelte/transition';

    let tabs = [
		{ name: "Debit card", card_number: "**** **** **** 2345", balance: "18,986.00" },
		{ name: "Credit card", card_number: "**** **** **** 1234", balance: "1,768.00" },
	]
    let selected = tabs[0].name;
    
</script>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 ml-2 gap-x-6">
    <div class="col-span-1 flex flex-col">
        <h2 class="mt-6 text-2xl text-dark font-semibold">My account</h2>
        <div class="flex flex-row gap-5 mt-6">  
            {#each tabs as tab, i}
                <button transition:fade={{duration: 200}} on:click={() => selected = tab.name} class="inline-block pb-4 rounded-t-lg cursor-pointer transition-all duration-200 ease-linear
                    {selected === tab.name ? 'text-primary border-b-2 border-primary' : 'border-b-2 border-transparent text-light hover:text-primary'}">
                    {tab.name}
                </button>
            {/each}
        </div>
        <div class="flex gap-3 items-center mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M12 9.765a3 3 0 1 0 0 4.47" />
                <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            </svg>
            {#each tabs as tab, i}
                {#if selected === tab.name}
                <span>{tab.card_number}</span>
                {/if}
            {/each}
        </div>
        <div class="flex flex-col justify-between mt-6">
            <span class="text-light text-md font-medium">Total balance</span>
            <span class="text-dark text-5xl font-medium ">
                {#each tabs as tab, i}
                    {#if selected === tab.name}
                        &euro;{tab.balance}
                    {/if}
                {/each}
            </span>
        </div>
    </div>
    <div class="col-span-1 lg:col-span-3 flex flex-col">
        b
    </div>
    <div class="col-span-1 flex flex-col mt-24">
        <div class="flex justify-between items-center">
            <h2 class="text-2xl text-dark font-semibold">Saved contacts</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
            </svg>
        </div>
        <div class="flex flex-col">
            {#each {length: 4} as _, i}
            <div class="flex justify-between mt-6">
                <div class="flex gap-3">
                    <img class="w-11 h-11 rounded-full object-cover" src="https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar">
                    <div class="flex flex-col">
                        <span class="text-md font-bold text-dark">Hessel</span>
                        <span class="text-sm text-light font-medium -mt-1">NL 5778 6432 8907 5512</span>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
            </div>
            {/each}
        </div>
    </div>
    <div class="col-span-1 lg:col-span-3 flex flex-col mt-24 ml-2 lg:ml-16">
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col">
                <h2 class="text-xl md:text-2xl text-dark font-semibold">Transaction history</h2>
                <p class="text-md md:text-lg text-light font-medium">You have 21 transactions this month</p>
            </div>
            <a href="/transactions" class="text-primary hover:text-primary/95 transition ease-in-out duration-150">View transactions</a>
        </div>
        <div class="mt-5 flex flex-col overflow-scroll md:overflow-hidden">
            <div class="text-light flex flex-row justify-between font-semibold">
                <span class="w-full">Date</span>
                <span class="w-full">Name</span>
                <span class="w-full">IBAN</span>
                <span class="w-full">Type</span>
                <span class="w-full">Amount</span>
            </div>
            {#each {length: 3} as _, i}
            <div class="mt-5 flex flex-row justify-between items-center">
                <div class="flex w-full flex-col">
                    <span class="text-dark font-semibold">Oct 18, 2023</span>
                    <span class="text-light">8:45 am</span>
                </div>
                <div class="flex w-full gap-x-3">
                    <img class="h-11 w-11 rounded-full object-cover" src="https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar" />
                    <div class="flex flex-col">
                        <span class="text-md text-dark font-bold">Hessel</span>
                        <span class="text-sm text-light font-medium">Linux VPS</span>
                    </div>
                </div>
                <div class="text-light w-full font-semibold">NL57 5678 5543 7890 4321</div>
                <span class="text-dark w-full">Personal</span>
                <span class="text-red-600 w-full">- &euro;10,00</span>
            </div>
            {/each}
        </div>
    </div>

</div>