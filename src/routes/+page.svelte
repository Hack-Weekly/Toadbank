<script>
  import { goto } from "$app/navigation";
  async function logout () {
    const response = await fetch("/auth/logout", { method: "DELETE" })
    goto(response.url)
  }

</script>

<h1 class="text-3xl font-bold underline text-red-500">
    Hello world!
</h1>

<button class="p-3 bg-red-500 text-white" on:click={logout}>
  Logout
</button>
