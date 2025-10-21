import { useEffect, useState } from "react";
import "./App.css";
import { List, ListItem, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [reactivities, setReactivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get("https://localhost:5001/api/activities").then((data) => {
      setReactivities(data.data);
    });
    return () => {};
  }, []);
  console.log(reactivities);
  return (
    <>
      <Typography variant="h3" component="h3" color="primary">
        Reactivities
      </Typography>
      <List>
        {reactivities.map((item: Activity) => (
          <ListItem key={item.id}>{item.title}</ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
