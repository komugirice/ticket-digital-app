import {
  Heading,
  Page,
  Layout,
  ResourceList,
  ResourceItem,
  Card,
  DataTable,
  TextStyle,
  Button,
  Navigation,
} from "@shopify/polaris";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import store from "store-js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "../lib/axios";
import { Redirect } from "@shopify/app-bridge/actions";
import React from "react";
import { Context } from "@shopify/app-bridge-react";
import Link from "next/link";

// const Index = () => {
class Index extends React.Component {
  static contextType = Context;

  render() {
    let rows = [];

    const outputCode = () => {
      const str =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // ランダムに発行する文字の対象
      const len = 15; // 桁数
      let code = "";
      for (let i = 0; i < len; i++) {
        code += str.charAt(Math.floor(Math.random() * str.length));
      }
      alert(code);
      return code;

      // const user = await prisma.user().findMany({
      //   where: { published: true },
      // });
      // console.log(user);
    };

    const insertTicket = (row) => {
      const code = outputCode();
      console.log("insertTicket");
      // console.log(row);

      let ticket = {
        event_seq: 1,
        order_id: row.id,
        code: code,
        regdate: new Date(),
        regmailaddr: "aaa",
        upddate: new Date(),
        updmailaddr: "bbb",
      };
      axios.post("/tickets.json", ticket);
    };

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

    const app = this.context;
    const redirectToQr = () => {
      // console.log(app);
      const redirect = Redirect.create(app);
      // console.log(redirect);
      redirect.dispatch(Redirect.Action.APP, "/qr");
    };
    return (
      <div>
        {/* <Navigation location="/">
          <Navigation.Section
            items={[
              {
                url: '/',
                exactMatch: true,
                label: 'Home'
              },
              {
                url: 'qr',
                label: 'QR'
              },
            ]}
          />
        </Navigation> */}
        {/* <Button onClick={() => redirectToQr()}>
        QRコードページ
      </Button> */}
        <Link href="/qr">
          <a>QRコードページ</a>
        </Link>
        {/* <Link url="./qr">QRコードページ</Link> */}
        <Page title="注文一覧">
          <Query query={GET_ORDERS}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading…</div>;
              if (error) return <div>{error.message}</div>;
              // console.log(data.orders.edges);
              data.orders.edges.map((data, i) => {
                const index = i;
                const id = data.node.id;
                const name =
                  data.node.customer.lastName + data.node.customer.firstName;
                const productId = data.node.lineItems.edges[0].node.product.id;
                const productName = data.node.lineItems.edges[0].node.name;
                const quantity = data.node.lineItems.edges[0].node.quantity;
                const elm = {
                  index: index,
                  id: id,
                  name: name,
                  productId: productId,
                  productName: productName,
                  quantity: quantity,
                };
                // console.log(elm);
                rows.push(elm);
              });
              return (
                <Layout>
                  <Layout.Section>
                    {/* <DataTable
                    columnContentTypes={[
                      "text",
                      "text",
                      "text",
                      "text",
                      "numeric",
                      "text"
                    ]}
                    headings={["注文ID", "氏名", "商品ID", "商品名", "数量", "ボタン"]}
                    rows={rows}
                  /> */}
                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>注文ID</TableCell>
                            <TableCell>氏名</TableCell>
                            <TableCell>商品ID</TableCell>
                            <TableCell>商品名</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => {
                            console.log(row);
                            return (
                              <TableRow key={row.index}>
                                <TableCell key={row.index + "_1"}>
                                  {row.id}
                                </TableCell>
                                <TableCell key={row.index + "_2"}>
                                  {row.name}
                                </TableCell>
                                <TableCell key={row.index + "_3"}>
                                  {row.productId}
                                </TableCell>
                                <TableCell key={row.index + "_4"}>
                                  {row.productName}
                                </TableCell>
                                <TableCell key={row.index + "_5"}>
                                  {row.quantity}
                                </TableCell>
                                <TableCell key={row.index + "_6"}>
                                  <Button onClick={() => insertTicket(row)}>
                                    コード発行
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Layout.Section>
                </Layout>
              );
            }}
          </Query>
        </Page>
      </div>
    );
  }
}

export default Index;
