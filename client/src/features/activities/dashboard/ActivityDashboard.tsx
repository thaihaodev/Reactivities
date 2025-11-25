import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity: Activity | undefined;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
};

const ActivityDashboard = (props: Props) => {
  const {
    activities,
    selectActivity,
    cancelSelectActivity,
    selectedActivity,
    editMode,
    openForm,
    closeForm,
  } = props;

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          closeForm={closeForm}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ActivityDashboard;
