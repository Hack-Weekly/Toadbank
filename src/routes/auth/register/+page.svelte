<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "../$types";

  export let form: ActionData

  $: if (form) console.log(form)
</script>

<form method="post" use:enhance>
    <input type="text" name="email" class="bg-black text-white p-3 text-xl">
    <input type="password" name="password" class="bg-black text-white p-3 text-xl">
    <input type="password" name="confirm_password" class="bg-black text-white p-3 text-xl">
    <button type="submit" class="bg-green-500 text-white p-3">Submit</button>
</form>
