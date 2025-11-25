import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  closeForm: () => void;
};

const ActivityList = (props: Props) => {
  const { activities, selectActivity, closeForm } = props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => {
        return (
          <ActivityCard
            key={activity.id}
            activity={activity}
            selectActivity={selectActivity}
            closeForm={closeForm}
          />
        );
      })}
    </Box>
  );
};

export default ActivityList;
