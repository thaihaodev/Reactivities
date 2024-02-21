import React, { useState } from "react";
import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemExtra,
  ItemGroup,
  ItemHeader,
  ItemMeta,
  Label,
  Segment,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
const ActivityList = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) => {
  const [target, setTarget] = useState("");
  const handleActivityDelete = (e: any, id: string) => {
    setTarget(e.target.name);
    deleteActivity(id);
  };
  return (
    <Segment>
      <ItemGroup divided>
        {activities.map((activity: Activity) => (
          <Item key={activity.id}>
            <ItemContent>
              <ItemHeader as="a">{activity.title}</ItemHeader>
              <ItemMeta>{activity.date}</ItemMeta>
              <ItemDescription>
                <div>{activity.description}</div>
                <div>
                  {activity.city},{activity.venue}
                </div>
              </ItemDescription>
              <ItemExtra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={submitting && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                />
                <Label basic content={activity.category} />
              </ItemExtra>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default ActivityList;
