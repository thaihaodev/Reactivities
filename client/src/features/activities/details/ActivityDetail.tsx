import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
};

const ActivityDetail = (props: Props) => {
  const { activity, cancelSelectActivity, openForm } = props;
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => openForm(activity.id)}>
          Edit
        </Button>
        <Button onClick={cancelSelectActivity} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActivityDetail;
