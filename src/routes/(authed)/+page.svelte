<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  console.log($page.data)

  const cards = $page.data.cards || null

  async function removeCard (cid: string) {
    const response = await fetch(`/card/delete?cid=${cid}`, { method: "DELETE" })
    const data = await response.json()
    if (data.url) {
      window.location = data.url
    }
  }

</script>

{#each cards as { card_type, created_at, cardholder, last_digits, id, company }}
  <div>
      <h2>{card_type}</h2>
      <h2>{created_at}</h2>
      <h2>{last_digits}</h2>
      <h2>{id}</h2>
      <h2>{cardholder}</h2>
      <h2>{company}</h2>
      <button on:click={() => removeCard(id)} class="bg-red-500 text-white p-3">Remove Card</button>
      <a href={`/card/update?cid=${id}`} class="bg-blue-500 text-white p-3">Update Card</a>
  </div>
{/each}

<div>This is a page</div>
