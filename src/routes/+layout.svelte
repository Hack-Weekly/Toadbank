<script>
    import "../app.css";
    import { writable } from 'svelte/store';

    // Create a writable store
    const isOpen = writable(false);
</script>
<button on:click={() => $isOpen = !$isOpen} data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-6 ml-3 text-sm text-dark rounded-lg sm:hidden focus:outline-none focus:ring-0">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
       <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
 </button>
 
<aside id="separator-sidebar" class:translate-x-0={$isOpen} class="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-[105%] sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full py-4 overflow-y-auto bg-white shadow-menu sm:shadow-none">
        <button on:click={() => $isOpen = !$isOpen} class="bg-transparent focus:ring-0 outline-none ml-3 block sm:hidden mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-dark" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
            </svg>
        </button>
        <h1 class="flex justify-start mt-6 text-3xl text-dark font-bold ml-14 ">ToadBank.</h1>
        <ul class="flex flex-col items-start ml-14 mt-12 space-y-4">
            <li class="flex gap-3 rounded-lg text-white bg-primary py-2 px-3 w-4/5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 4h6v6h-6z" />
                    <path d="M14 4h6v6h-6z" />
                    <path d="M4 14h6v6h-6z" />
                    <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
                <span class="mt-0.5 pr-1">Overview</span>     
            </li>
            <li class="flex gap-3 rounded-lg text-dark bg-white py-2 px-3 w-4/5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                    <path d="M3 10l18 0" />
                    <path d="M7 15l.01 0" />
                    <path d="M11 15l2 0" />
                </svg>
                <span class="mt-0.5 pr-1">Transactions</span>     
            </li>
            <li class="flex gap-3 rounded-lg text-dark bg-white py-2 px-3 w-4/5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                    <path d="M3 10l18 0" />
                    <path d="M7 15l.01 0" />
                    <path d="M11 15l2 0" />
                </svg>
                <span class="mt-0.5 pr-1">Savings</span>     
            </li>
            <li class="flex gap-3 rounded-lg text-dark bg-white py-2 px-3 w-4/5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                    <path d="M3 10l18 0" />
                    <path d="M7 15l.01 0" />
                    <path d="M11 15l2 0" />
                </svg>
                <span class="mt-0.5 pr-1">Contacts</span>     
            </li>
        </ul>
    </div>
</aside>
<div class="px-4 pt-2 sm:ml-64 mt-6">
    <div class="flex items-center justify-between">
        <span class="ml-3 md:ml-0 text-lg sm:text-xl md:text-2xl font-medium">Welcome back <strong>Hessel!</strong></span>
        <div class="flex gap-3 mr-14">
            <img class="w-11 h-11 rounded-full object-cover" src="https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar">
            <div class="flex flex-col">
                <span class="text-md font-bold text-dark">Hessel</span>
                <span class="text-sm text-light font-medium -mt-1">hesselpa@live.nl</span>
            </div>
        </div>
    </div>
    <div class="container mx-auto">
        <slot />
    </div>
</div>
<style>
    .translate-x-0 {
      transform: translateX(0);
    }
</style>