<section class="mt-12">
    <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col">
            <h2 class="text-xl md:text-2xl text-dark font-semibold">Transactions</h2>
            <p class="text-md md:text-lg text-light font-medium">An overview of all your transactions</p>
        </div>
        <a href="/transactions/new-transaction" class="bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/95 transition ease-in-out duration-150">Make transation</a>
    </div>
    <div class="flex flex-col overflow-scroll md:overflow-hidden mt-5">
        <div class="flex flex-row justify-between text-light font-semibold">
            <span>Date</span>
            <span>Name</span>
            <span>Type</span> 
            <span>Amount</span>
        </div>
        {#each {length: 3} as _, i}
            <div class="flex flex-row justify-between mt-5">
                <div class="flex flex-col">
                    <span class="font-semibold text-dark">Oct 18, 2023</span>
                    <span class="text-light">8:45 am</span>
                </div>
                <div class="flex gap-x-3">
                    <img class="w-11 h-11 rounded-full object-cover" src="https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar">
                    <div class="flex flex-col">
                        <span class="text-md font-bold text-dark">Hessel</span>
                        <span class="text-sm text-light font-medium -mt-1">Linux VPS</span>
                    </div>
                </div>
                <div class="font-semibold text-dark">Personal</div>
                <span class="text-red-600">- &euro;10,00</span>
            </div>
        {/each}
    </div>
</section>