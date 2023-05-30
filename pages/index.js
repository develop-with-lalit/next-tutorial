import { useRef, useState } from "react";

function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();

  const [feedbackItems, setFeedbackItems] = useState([]);

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.data);
      });
  }

  function handleSumbit(e) {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(feedbackRef.current.value);

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        text: feedbackRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <h1>Hello World</h1>
      <form onSubmit={handleSumbit}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Email Address</label>
          <textarea id="feedback" rows="5" ref={feedbackRef} />
        </div>
        <div>
          <button type="submit"> Submit </button>
        </div>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedbacks</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}> {item.text} </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
