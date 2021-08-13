import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateTaskMutation } from "../src/generated";

export function CreateModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //title and status
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useCreateTaskMutation({
    onSuccess: () => {
      queryClient.invalidateQueries("getMyTasks");
    },
  });

  const handleCreate = async () => {
    setError("");
    if (taskTitle.length > 0) {
      const res = await mutateAsync({
        title: taskTitle,
      });
      if (res.createTask.title) {
        onClose();
      }
    } else {
      setError("Title is required");
    }
  };

  return (
    <Box {...props}>
      <Button onClick={() => onOpen()}>Create a new task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Task: {taskTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                value={taskTitle}
                placeholder="Title your task"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Text color="red" alignSelf="start">
                {error}
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreate}
              isLoading={isLoading}
            >
              Create
            </Button>
            <Button variant="ghost" onClick={() => onClose()}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
