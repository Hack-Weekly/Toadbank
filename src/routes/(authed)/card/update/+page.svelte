<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData, PageServerData } from "./$types";
    
    export let data: PageServerData
    export let form: ActionData

    const card = data.card

</script>

<form class="bg-black p-3 z-10 absolute flex border-green-500" method="post" use:enhance>
    <input class="bg-black p-2" type="text" name="cardholder" placeholder="cardholder" value={card.cardholder}>
    <input type="text" name="company" placeholder="company" value={card.company}>
    <input type="text" name="digits" placeholder="digits" value={card.digits}/>
    <input type="text" name="type" placeholder="card type" value={card.card_type} disabled/>
    <button class="bg-green-500 p-3 text-white">Submit</button>
</form>
