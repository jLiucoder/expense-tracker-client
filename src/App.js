import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ExpenseForm from "./form";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [total, setTotal] = useState(0);
  const [totalList, setTotalList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://${process.env.REACT_APP_HOST_IP}:443/total`
        );
        const list = await axios.get(
          `https://${process.env.REACT_APP_HOST_IP}:443/totalList`
        );
        setTotal(res.data[0].total);
        setTotalList(list.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (index) => {
    try {
      console.log(index);
      const res = await axios.delete(
        `https://${process.env.REACT_APP_HOST_IP}:443/`,
        {
          data: { index: index },
        }
      );
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <small>
          You are running this application in{" "}
          <b>{process.env.REACT_APP_NODE_ENV}</b> mode.
        </small>
        <h1>Expense Tracker</h1>
        <p>Total amount: ${total == undefined ? 0 : total}</p>
        <h3>Expense List</h3>
        <div style={{ height: "300px", overflowY: "scroll" }}>
          <div>
            {totalList.map((item) => (
              <span key={item.index}>
                <p>
                  {item.item} : {item.amount}{" "}
                  <DeleteIcon onClick={() => deleteItem(item.index)} />
                </p>
              </span>
            ))}
          </div>
        </div>

        <ExpenseForm />
      </header>
    </div>
  );
}

export default App;
