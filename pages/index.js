import {
  Heading,
  Page,
  Layout,
  ResourceList,
  ResourceItem,
  Card,
  DataTable,
  TextStyle,
} from "@shopify/polaris";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import store from "store-js";

const Index = () => {
  const rows = [
    ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
    ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
    [
      "Navy Merino Wool Blazer with khaki chinos and yellow belt",
      "$445.00",
      124518,
      32,
      "$14,240.00",
    ],
  ];

  const GET_ORDERS = gql`
    query getOrders {
      orders(first: 10) {
        edges {
          node {
            id
            customer {
              id
              lastName
              firstName
            }
            lineItems(first: 10) {
              edges {
                node {
                  name
                  quantity
                  product {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  return (
    <Page title="注文一覧">
      <Query query={GET_ORDERS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data.orders.edges);
          return (
            <Layout>
              <Layout.Section>
                <ResourceList
                  showHeader
                  resourceName={{ singular: "Order", plural: "Orders" }}
                  items={data.orders.edges}
                  renderItem={(item) => {
                    const name =
                      item.node.customer.lastName +
                      item.node.customer.firstName;
                    const customerId = item.node.customer.id;
                    return (
                      <ResourceItem id={customerId} name={name}>
                        <h3>
                          <TextStyle variation="strong">{customerId}</TextStyle>
                        </h3>
                        <h3>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                      </ResourceItem>
                    );
                  }}
                />
              </Layout.Section>
            </Layout>
          );
        }}
      </Query>
    </Page>
  );
};

export default Index;
