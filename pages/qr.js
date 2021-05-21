import { Page, Layout, Button } from "@shopify/polaris";
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
import firebase from "firebase";
import Modal from "../components/modal";
import { Context } from "@shopify/app-bridge-react";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import QRCode from "qrcode.react";
import { useState } from "react";

const Qr = async () => {
  let rows = [];
  const [code, setCode] = useState("");
  const [showModal, hideModal] = useModal(() => {
    let code = outputCode();
    setCode(code);

    return (
      <>
        <ReactModal isOpen>
          <QRCode value={code} />
          <button onClick={hideModal}>Hide modal</button>
          <p>{code}</p>
        </ReactModal>
      </>
    );
  });

  const outputCode = () => {
    const str =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // ランダムに発行する文字の対象
    const len = 15; // 桁数
    let code = "";
    for (let i = 0; i < len; i++) {
      code += str.charAt(Math.floor(Math.random() * str.length));
    }
    return code;
  };

  const displayQR = (row) => {
    // let code = outputCode();
    // setCode(code);
    showModal();
  };

  axios
    .get("/tickets.json")
    .then((res) => {
      console.log(res.data);
      let array = Object.entries(res.data);
      array.map((data, i) => {
        const id = i;
        const orderId = data[1].order_id;
        const code = data[1].code;
        const row = {
          index: i,
          orderId: orderId,
          code: code,
        };
        rows.push(row);
      });
    })
    .catch((error) => {
      //異常終了時
      alert(error);
    });

  return (
    <Page title="注文一覧">
      <Layout>
        <Layout.Section>
          <TableContainer>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>注文ID</TableCell>
                  <TableCell></TableCell>
                  <TableCell>コード</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  console.log(row);
                  return (
                    <TableRow key={row.index}>
                      <TableCell key={row.index + "_1"}>
                        {row.orderId}
                      </TableCell>
                      <TableCell key={row.index + "_1"}>{row.code}</TableCell>
                      <TableCell key={row.index + "_2"}>
                        <Button onClick={() => displayQR(row)}>
                          コード表示
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
    </Page>
  );
};

export default Qr;
