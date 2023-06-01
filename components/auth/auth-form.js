import { useRef, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";

async function createUser(email, password) {
  const result = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  if (!data.ok) {
    throw new Error(data.message || "error in signup");
  }
  return data;
}

function AuthForm() {
  const router = useRouter();
  const emailRef = useRef();
  const paswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const emailData = emailRef.current.value;
    const passwordData = paswordRef.current.value;
    if (isLogin) {
      // later
      const result = await signIn("credentials", {
        redirect: false,
        email: emailData,
        password: passwordData,
      });
      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      const response = await createUser(emailData, passwordData);
      console.log(response);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={paswordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
