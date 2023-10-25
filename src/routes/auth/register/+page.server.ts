import { fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ url, request, locals: { supabase } }) => {
   const { email, username, password, confirm_password } = Object.fromEntries(await request.formData()) as Record<string, string>
    // validation
    if (!email) return fail(400, { message: 'Email is required', error: 'email' });
    if (!username) return fail(400, { message: 'Username is required', error: 'username' });
    if (!password) return fail(400, { message: "Password is required", error: "password" });
    if (!confirm_password) return fail(400, { message: "Password must be confirmed", error: "confirm_password" });

    //translation of regex "beginning must be a character or a digit, then can be followed by a "_", "-" or "." OR another character or digit 
    //there must at least be 3 characters and at max 18 for the previous part AND must end with a character or a digit"
    let usernameVal = new RegExp("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$");

    if(!usernameVal.test(username)) return fail(400, { message: "Username cannot be empty or have special characters or spaces"});

    let uppercase: Boolean = false
    let number: Boolean = false

    for (let i = 0; i < password.length; i++) {

        if (password[i] === " ") return fail(400, { message: "Password cannot contain spaces" })

        if (password[i] === password[i].toUpperCase()) {
            uppercase = true;
        }
        if (!isNaN(parseInt(password[i]))) {
            number = true;
        }

    }

    if (!uppercase) return fail(400, { message: "Password must contain at least one uppercase character", error: "password" });
    if (!number) return fail(400, { message: "Password must contain at least one number", error: "password" });
    if (password.length < 8) return fail(400, { message: "Password must be at least 8 characters long", error: "password" });
    if (password !== confirm_password) return fail(400, { message: "Passwords do not match", error: "confirm_password" })
    
    // validation End

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      }
    })
    
    if (data.user){
      const user = data.user;
      const {data: response, error} = await supabase
      .from("account")
      .insert({user_id: user.id, username: username, balance:(Math.random() * (100000 - 1) + 1).toFixed(2)}) //DO NOT DARE TO CHANGE THIS, YOU WILL EITHER BE RICH OR POOR
      if (error) return fail(400, {message: "failed, please try again", success: false})
    }

    return { message: "Successfuly signed up! Please verify your email and click on the magic link to confirm account creation", success: true } 
  }
}
