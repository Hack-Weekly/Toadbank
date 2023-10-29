<section class="mt-12">
    <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col">
            <h2 class="text-xl md:text-2xl text-dark font-semibold">Transactions</h2>
            <p class="text-md md:text-lg text-light font-medium">An overview of all your transactions</p>
        </div>
        <a href="/transactions/new-transaction" class="bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/95 transition ease-in-out duration-150">Make transation</a>
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
</section>