import React from "react";
import {
  useGetMyTasksQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated";

import { Box, Button, Text, Tooltip, VStack } from "@chakra-ui/react";
import { CreateModal } from "../../components/createModal";
import { EditModal } from "../../components/editModal";
import { AlertDialogEx } from "../../components/AlertDialog";
import { setAccessToken } from "../utils/token";
import { useRouter } from "next/dist/client/router";

export default function dash() {
  const { data } = useMeQuery();
  const { isLoading, data: taskData } = useGetMyTasksQuery();
  const { mutateAsync } = useLogoutMutation();

  const router = useRouter();

  // to log out the user we have to clear the access token from memory as well as the
  // cookie delete request should be sent

  const handleLogout = async () => {
    setAccessToken("");
    const res = await mutateAsync({});
    console.log(res);
    if (res.logout) {
      router.replace("/login");
    }
  };

  return (
    <div>
      <VStack margin="10">
        {isLoading && <Text>Loading tasks...</Text>}
        <Text fontSize="xl" alignSelf="start">
          Welcome {data?.me.username}
        </Text>
        <CreateModal alignSelf="start" color="blue.400" />
        <Button
          alignSelf="start"
          variant="ghost"
          color="red.400"
          onClick={handleLogout}
        >
          Logout
        </Button>
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
