import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";
import NavBar from "./NavBar";

function App() {
  // const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

const {activities, isPending} = useActivities();

  // useEffect(() => {
  //   axios.get("https://localhost:5001/api/activities").then((data) => {
  //     setActivities(data.data);
  //   });
  //   return () => {};
  // }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((a) => a.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ bgcolor: "#eee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading activities...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
