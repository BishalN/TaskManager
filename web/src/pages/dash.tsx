import React from "react";
import { useGetMyTasksQuery, useMeQuery } from "../generated";

import { Box, Text, Tooltip, VStack } from "@chakra-ui/react";
import { CreateModal } from "../../components/createModal";
import { EditModal } from "../../components/editModal";
import { AlertDialogEx } from "../../components/AlertDialog";

export default function dash() {
  const { data } = useMeQuery();
  const { isLoading, data: taskData } = useGetMyTasksQuery();

  return (
    <div>
      <VStack margin="10">
        {isLoading && <Text>Loading tasks...</Text>}
        <Text fontSize="xl" alignSelf="start">
          Welcome {data?.me.username}
        </Text>
        <CreateModal alignSelf="start" />
        {taskData &&
          taskData.getAllMyTasks.map((task) => (
            <Box
              key={task.id}
              w={["xs", "sm", "xl"]}
              bg={
                task.status === "active"
                  ? "blue.400"
                  : task.status === "completed"
                  ? "green.400"
                  : "red.400"
              }
              p="3"
              rounded="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Tooltip label={task.status}>
                <Text color="white">{task.title}</Text>
              </Tooltip>
              <Box>
                <EditModal task={task} />
                <AlertDialogEx task={task} />
              </Box>
            </Box>
          ))}
      </VStack>
    </div>
  );
}
