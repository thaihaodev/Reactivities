import React, { ChangeEvent, useState } from "react";
import { Button, Checkbox, Form, FormField, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityForm = ({
  closeForm,
  activity: selectedActivity,
  createOrEdit,
  submitting,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    description: "",
    date: "",
    venue: "",
    city: "",
    category: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <FormField>
          <label>Title</label>
          <input
            placeholder="Title"
            value={activity.title}
            name="title"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <label>Description</label>
          <input
            placeholder="Description"
            value={activity.description}
            name="description"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <label>Category</label>
          <input
            placeholder="Category"
            value={activity.category}
            name="category"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <label>Date</label>
          <input
            type="date"
            placeholder="Date"
            value={activity.date}
            name="date"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <label>City</label>
          <input
            placeholder="City"
            value={activity.city}
            name="city"
            onChange={handleInputChange}
          />
        </FormField>
        <FormField>
          <label>Venue</label>
          <input
            placeholder="Venue"
            value={activity.venue}
            name="venue"
            onChange={handleInputChange}
          />
        </FormField>
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={submitting}
          onClick={() => handleSubmit()}
        ></Button>
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        ></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
