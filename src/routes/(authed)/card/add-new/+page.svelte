<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData
</script>

<form class="bg-black p-3 z-10 absolute flex border-green-500" method="post" use:enhance>
    <input class="bg-black p-2" type="text" name="cardholder" placeholder="cardholder">
    <input type="text" name="company" placeholder="company">
    <input type="text" name="digits" placeholder="digits"/>
    <input type="text" name="type" placeholder="card type"/>
    <button class="bg-green-500 p-3 text-white">Submit</button>
</form>
