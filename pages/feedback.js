import React, { useState } from "react";
import { readFeedbackFromFile } from "./api/feedback";

const FeedbackPage = ({ feedbackItems }) => {
  const [feedbackDetail, setFeedbackDetail] = useState(null);
  function loadFeedbackDetail(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackDetail(data.data.email);
      });
  }
  return (
    <>
      <h1> FeedbackPage</h1>
      {feedbackDetail && <p>{feedbackDetail}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {" "}
            {item.text}{" "}
            <button onClick={loadFeedbackDetail.bind(null, item.id)}>
              Fetch Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FeedbackPage;

export async function getStaticProps() {
  let data = readFeedbackFromFile();
  return {
    props: {
      feedbackItems: data,
    },
  };
}
