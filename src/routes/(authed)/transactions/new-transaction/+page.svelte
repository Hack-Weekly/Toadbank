<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<section class="mt-12">
    <form method="POST" use:enhance>
        <div class="flex flex-row gap-3 justify-between">
            <div class="flex flex-col">
                <h2 class="text-xl md:text-2xl text-dark font-semibold">Make a transaction</h2>
                <p class="text-md md:text-lg text-light font-medium">Fill in the fields to make a transaction</p>
            </div>
        </div>
        <div class="mt-6 h-full overflow-hidden bg-white flex flex-col w-full md:w-3/4">
            <div class="py-6">
                <div class="w-full md:w-9/12 space-y-6">
                    <div class="flex flex-wrap -m-3">
                        <div class="w-full md:w-1/3 p-3">
                            <p class="text-sm text-dark font-semibold">Card</p>
                        </div>
                        <div class="w-full md:flex-1 p-3">
                            <div class="relative">
                                <svg class="absolute right-4 top-1/2 transform -translate-y-1/2" width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z" fill="#8896AB"></path>
                                </svg>
                                <select class="appearance-none w-full px-3 py-2.5 rounded-md border border-lighter-200 shadow-input placeholder-lighter-200 focus:ring-0 outline-none">
                                    <option selected disabled>Select a card</option>
                                    <option>Debit card</option>
                                    <option>Credit card</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap -m-3">
                        <div class="w-full md:w-1/3 p-3">
                            <p class="text-sm text-dark font-semibold">Receiver</p>
                        </div>
                        <div class="relative w-full md:flex-1 p-3">
                            <input name="receiver" type="text" id="default-search" class="w-full py-2.5 px-3 rounded-md border border-lighter-200 shadow-input placeholder-lighter-200 focus:ring-0 outline-none" placeholder="Search Mockups, Logos...">
                            <button class="z-20 text-dark absolute right-2.5 bottom-2.5 focus:ring-0 focus:outline-none mb-2 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class=" h-8 w-8 " viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                                    <path d="M10 16h6" />
                                    <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                    <path d="M4 8h3" />
                                    <path d="M4 12h3" />
                                    <path d="M4 16h3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-wrap -m-3">
                        <div class="w-full md:w-1/3 p-3">
                            <p class="text-sm text-dark font-semibold">Amount</p>
                        </div>
                        <div class="w-full md:flex-1 p-3">
                            <input name="amount" min="1" class="w-full px-3 py-2.5 rounded-md border border-lighter-200 shadow-input placeholder-lighter-200 focus:ring-0 outline-none" type="number" placeholder="Enter amount">
                        </div>
                    </div>
                    <div class="flex flex-wrap -m-3">
                        <div class="w-full md:w-1/3 p-3">
                            <p class="text-sm text-dark font-semibold">Comment</p>
                        </div>
                        <div class="w-full md:flex-1 p-3">
                            <input name="comment" class="w-full px-3 py-2.5 rounded-md border border-lighter-200 shadow-input placeholder-lighter-200 focus:ring-0 outline-none" type="text" placeholder="e.g. for dads birthday gift">
                        </div>
                    </div>
                    <button type="submit" class="px-3 py-2 flex ml-auto bg-primary hover:bg-primary/95 text-white font-medium text-medium md:text-lg rounded-lg transition duration-200 mt-6">
                        <span>Make transaction</span>
                    </button>
                </div>
            </div>
            
        </div>
    </form>
</section>
