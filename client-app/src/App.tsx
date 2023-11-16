import axios from "axios";
import { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((res) => {
        setActivities(res.data);
        // console.log("hehe", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => {};
  }, []);

  return (
    <List>
      {activities.map((item: any) => (
        <List.Item key={item.id}>{item.title}</List.Item>
      ))}
    </List>
  );
}

export default App;
