import React from "react";

const UserProfilePage = (props) => {
  return (
    <div>
      <h1>{props.userName}</h1>
    </div>
  );
};

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  //   if (!data) {
  //     return {
  //       redirect: {
  //         destination: "/about",
  //       },
  //     };
  //   }

  //   if (data.products.length === 0) {
  //     return {
  //       notFound: true,
  //     };
  //   }

  return {
    props: {
      userName: "Max",
    },
  };
}
