// Replace Array Lookups with Map for O(1) Access

// The unoptimized code uses array.find() in a loop, resulting in O(n*m) complexity.

import React, { useState } from "react";

const App = () => {
  const [users] = useState([
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "moderator" },
    { id: 4, name: "David", role: "user" },
    { id: 5, name: "Eve", role: "admin" },
  ]);
  // [ [1, {id:1, name:"Alice"}], [2, {id:2, name:"Bob"}] ]

  const [activities] = useState([
    { userId: 1, action: "login", timestamp: Date.now() },
    { userId: 3, action: "post", timestamp: Date.now() },
    { userId: 1, action: "comment", timestamp: Date.now() },
    { userId: 2, action: "like", timestamp: Date.now() },
    { userId: 4, action: "share", timestamp: Date.now() },
  ]);

  // const getActivityWithUserDetails = () => {
  //   console.log("Processing activities...");
  //   let enrichedActivities = [];

  //   // O(n*m) complexity - finding user for each activity
  //   for (let i = 0; i < activities.length; i++) {
  //     const activity = activities[i];
  //     const user = users.find((u) => u.id === activity.userId);
  //     enrichedActivities.push({
  //       ...activity,
  //       userName: user ? user.name : "Unknown",
  //       userRole: user ? user.role : "Unknown",
  //     });
  //   }

  //   return enrichedActivities;
  // };

  const getActivityWithUserDetails = () => {
    const userMap = new Map(users.map((user) => [user.id, user]));

    return activities.map((activity) => {
      const user = userMap.get(activity.userId);
      return {
        ...activity,
        userName: user ? user.name : "Unknown",
        userRole: user ? user.role : "Unknown",
      };
    });
  };

  const enrichedData = getActivityWithUserDetails();

  return (
    <div>
      <h1>User Activities</h1>
      {enrichedData.map((item, index) => (
        <p key={index}>
          {item.userName} ({item.userRole}) - {item.action}
        </p>
      ))}
    </div>
  );
};

export default App;
