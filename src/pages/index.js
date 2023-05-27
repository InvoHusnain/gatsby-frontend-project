import * as React from "react";
import DataProvider from "../contexts/DataProvider";
// import { graphql } from "gatsby";
import Interface from "../components/interface";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// export const query = graphql`
//   query MyQuery {
//     allStrapiProduct {
//       nodes {
//         seo {
//           Message
//           Name
//         }
//         Description
//         Title
//         categories {
//           Name
//           products {
//             Description
//             Title
//           }
//         }
//       }
//     }
//   }
// `;

const IndexPage = () => {
  return (
    <DataProvider>
      <Interface />
    </DataProvider>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
