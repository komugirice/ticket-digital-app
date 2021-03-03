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
  let rows = [];

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
          data.orders.edges.map((data) => {
            const name =
              data.node.customer.lastName + data.node.customer.firstName;
            const id = data.node.customer.id;
            const productId = data.node.lineItems.edges[0].node.product.id;
            const productName = data.node.lineItems.edges[0].node.name;
            const quantity = data.node.lineItems.edges[0].node.quantity;
            const elm = [id, name, productId, productName, quantity];
            console.log(elm);
            rows.push(elm);
          });
          return (
            <Layout>
              <Layout.Section>
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "text",
                    "numeric",
                  ]}
                  headings={["ID", "氏名", "商品ID", "商品名", "数量"]}
                  rows={rows}
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
