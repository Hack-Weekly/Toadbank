import ServerCrypto from "$lib/server/crypto";
import Currencies from "$lib/server/currencies";
import { error, fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    // recheck
    const session = await getSession()
    if (!session) throw error(401, "You cannot view or use this page!")
    // in a rush ill just set the default card to the users card
    const { amount, comment, receiver: iban, card_id } = Object.fromEntries(await request.formData()) as Record<string, string>
    // NOTE: RECEIVER MUST BE AN IBAN NUMBER
    const { data: senderData, error: senderErr } = await supabase
    .from("account")
    .select("id, balance, currency, iban, credit_card_id")
    .eq("user_id", session.user.id)
     
    if (senderErr) return fail(400, { message: "Error Getting The Sender!" })
    const { data: receiverData, error: receiverErr } = await supabase
    .from("account")
    .select("id, balance, currency")
    .eq("iban", iban)
  
    if (receiverErr) return fail(400, { message: "Error Getting The Receiver!" })
    
    const amountToBeSent = Number(amount)

    if (receiverData && senderData) {
      const { id: senderAccountId, balance: senderBalance, currency: senderCurrency, iban: senderIban, credit_card_id: senderCreditCardId } = senderData[0]
      const { id: receiverAccountId, balance: receiverBalance, currency: receiverCurrency } = receiverData[0]

      if (senderAccountId === receiverAccountId) return fail(403, { message: "User cannot deposit into his/her own account!", success: false })
      const from = Currencies.setDineroObject(amountToBeSent, senderCurrency as AvailableCurrencies)

      // convert sent to receivers currency
      // then push to transactions and subtract the sent amount from the senders account balance
      
      if (!from) throw error(500, { message: "Something occured during the transaction process!" })

      const updatedSenderBalance = Number(senderBalance) - amountToBeSent
      // i gotta go so i wont error handle :(
      await supabase.from("account").update({ balance: updatedSenderBalance }).eq("id", senderAccountId)
      const converted = Currencies.conversion(from, receiverBalance as AvailableCurrencies)

      // there should be an error handler that does the following when there is an error
      // 1. Gives the sender his amount back
      // 2. Remove any sent data to the receiver
      // 3. Essentially a SQL transaction but supabase does not seem to have this in their API? So I would have to do it by hand?
      const { data: transactionData, error: transactionErr } = await supabase.from("transactions").insert({
          sender_iban: senderIban,
          receiver_iban: iban,
          card_id: senderCreditCardId,
          comment,
          receiver_currency: receiverCurrency,
          sender_currency: senderCurrency,
          amount_original: amountToBeSent,
          amount_converted: converted
      })

      if (transactionErr) {
        throw error(500, { message: "Something occured during the transaction process!" })
      }

    }
  }
}
