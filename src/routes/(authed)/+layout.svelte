<script lang="ts">
    import "../../app.css";
    import { goto } from "$app/navigation";
    import { writable } from 'svelte/store';
    import type { LayoutServerData } from "../$types";

    export let data: LayoutServerData

    console.log(data)

    async function logout () {
    const response = await fetch("/auth/logout", { method: "DELETE" })
        goto(response.url)
    }
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
    <div class="flex flex-col justify-between h-full py-4 overflow-y-auto bg-white shadow-menu sm:shadow-none">
        <div>
            <button on:click={() => $isOpen = !$isOpen} class="bg-transparent focus:ring-0 outline-none ml-3 block sm:hidden mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-dark" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
            <h1 class="flex justify-start mt-6 text-3xl text-dark font-bold ml-14 ">ToadBank.</h1>
            <ul class="flex flex-col items-start ml-14 mt-12 space-y-4">
                <li class="rounded-lg text-white bg-primary py-2 px-3 w-4/5">
                    <a href="/" class="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 4h6v6h-6z" />
                            <path d="M14 4h6v6h-6z" />
                            <path d="M4 14h6v6h-6z" />
                            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        </svg>
                        <span class="mt-0.5 pr-1">Overview</span> 
                    </a>    
                </li>
                <li class="rounded-lg text-dark hover:text-primary transition ease-in-out duration-150 bg-white py-2 px-3 w-4/5">
                    <a href="/transactions" class="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                            <path d="M3 10l18 0" />
                            <path d="M7 15l.01 0" />
                            <path d="M11 15l2 0" />
                        </svg>
                        <span class="mt-0.5 pr-1">Transactions</span> 
                    </a>    
                </li>
                <li class="rounded-lg text-dark hover:text-primary transition ease-in-out duration-150 bg-white py-2 px-3 w-4/5">
                    <a href="/savings" class="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
                            <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
                            <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
                            <path d="M3 6v10c0 .888 .772 1.45 2 2" />
                            <path d="M3 11c0 .888 .772 1.45 2 2" />
                        </svg>
                        <span class="mt-0.5 pr-1">Savings</span>
                    </a>
                </li>
                <li class="rounded-lg text-dark hover:text-primary transition ease-in-out duration-150 bg-white py-2 px-3 w-4/5">
                    <a href="/contacts" class="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                        </svg>
                        <span class="mt-0.5 pr-1">Contacts</span>     
                    </a>
                </li>
            </ul>
        </div>
        <ul class="flex flex-col items-start ml-14 mb-12 space-y-4">
            <li class="rounded-lg text-dark hover:text-primary transition ease-in-out duration-150 bg-white py-2 px-3 w-4/5">
                <a href="/settings" class="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-dark" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    </svg>
                    <span class="mt-0.5 pr-1">Settings</span>     
                </a>
            </li>
            <li class="text-dark hover:text-primary transition ease-in-out duration-150 py-2 px-3 ml-0.5">
                <button on:click={logout} class="flex gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-dark" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                    </svg>
                    Logout
                </button>
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
    <div class="container">
        <slot />
    </div>
</div>
<style>
    .translate-x-0 {
      transform: translateX(0);
    }
</style>
