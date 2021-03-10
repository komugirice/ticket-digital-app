var db = require("../pghelper");

/**
 * チケットマスタ一覧を取得します
 * @param req
 * @param res
 * @param next
 * @returns {*|ServerResponse}
 */
function getTicketMasters(req, res, next) {
  db.query("SELECT * FROM ticket_master", [], function (err, datas) {
    if (err) {
      console.log(err);
      return res.status(400).send("エラーが発生しました");
    }
    return res.send(JSON.stringify(datas));
  });
}

/**
 * チケットマスタを登録します
 * @param req
 * @param res
 * @param next
 * @returns {*|ServerResponse}
 */
function postTicketMaster(req, res, next) {
  var body = req.body;
  db.query(
    "INSERT INTO users (ticket_id, event_seq, order_id, code, regdate, regmailaddr, moddate, modmailaddr) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ",
    [
      body.ticket_id,
      body.event_seq,
      body.order_id,
      body.code,
      body.regdate,
      body.regmailaddr,
      body.moddate,
      body.modmailaddr,
    ],
    function (err, datas) {
      if (err) {
        console.log(err);
        return res.status(400).send("エラーが発生しました");
      }
      return next();
    }
  );
}

exports.getTicketMasters = getTicketMasters;
exports.postTicketMaster = postTicketMaster;
