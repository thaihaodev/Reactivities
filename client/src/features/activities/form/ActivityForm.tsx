import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
  closeForm: () => void;
  activity?: Activity;
  submitForm: (activity: Activity) => void;
};

const ActivityForm = (props: Props) => {
  const { closeForm, activity,submitForm } = props;

  const handlSubmit = (event: FormEvent) => {
    event.preventDefault(); 
    const form = event.currentTarget as HTMLFormElement; 
    // Tạo đối tượng FormData từ form element
    const data = new FormData(form);
    // Tạo một object JS chuẩn từ FormData
    const payload = Object.fromEntries(data.entries());
    console.log("Dữ liệu form (FormData):", payload); 
    // TODO: Truyền payload này qua API
    submitForm({...payload, id: activity?.id ?? ''} as Activity);
    // closeForm();
  };
  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create activity
      </Typography>
      <Box component="form"  onSubmit={handlSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
        name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField name="category" label="Category" defaultValue={activity?.category} />
        <TextField name="date" label="Date" defaultValue={activity?.date} type="date" slotProps={{ inputLabel: { shrink: true } }} />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
