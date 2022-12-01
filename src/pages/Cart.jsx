import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ORDERDATA } from "../api/mock-data";
import { useConfirm } from "../contexts/DialogProvider";
import dialogs from "../dialogs.json";

export default function Cart() {
  return (
    <>
    <div className="cart">
      <Table/>
    </div>
    </>
  );
}

function TableItem({ data, deleteItem }) {
  const {id, description, imageUrl, detailed, extra, price, type} = data;
  return (
    <>
      <tr>
        <td><input className="form-check-input" type="checkbox"/></td>
        <td>{id}</td>
        <td style={{textAlign: "left"}}>{description}</td>
        <td><img src={imageUrl} alt=""></img></td>
        <td><input className="form-check-input" type="checkbox" defaultChecked={detailed}/></td>
        <td>{extra}</td>
        <td>{price}</td>
        <td>{type}</td>
        <td><Button variant="primary" onClick={() => deleteItem(id)}>Delete</Button></td>
      </tr>
    </>
  );
}

function Table() {
  const [orders, setOrders] = useState(ORDERDATA);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const { setShowConfirm, confirm, setConfirm, setMessage } = useConfirm();

  const deleteItem = useCallback((id) => {
    setShowConfirm(true);
    setMessage(dialogs.confirm.delete);
    setDeleteIndex(id);
  }, [setShowConfirm, setMessage]);

  useEffect(() => {
    if(confirm) {
      const array = orders.filter(el => el.id !== deleteIndex);
      setOrders(array);
    }
    setConfirm(false);
  }, [confirm, orders, setConfirm, deleteIndex])

  return (
    <table className="table table-hover table-responsive">
      <thead>
        <tr>
          <th></th>
          <th width="7%">ID</th>
          <th width="27%">Description</th>
          <th width="16%">Reference</th>
          <th>Detailed</th>
          <th>Characters</th>
          <th>Price</th>
          <th>Type</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((el) => (
          <TableItem data={el} key={el.id} deleteItem={deleteItem}/>
        ))}
      </tbody>
    </table>
  );
}