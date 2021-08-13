import {
  Button,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useUpdateTaskMutation } from "../src/generated";
import { FiEdit } from "react-icons/fi";

export function EditModal({ task }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //title and status
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskStatus, setTaskStatus] = useState(task.status);

  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useUpdateTaskMutation({
    onSuccess: () => {
      console.log("we are here on the success");
      queryClient.invalidateQueries("getMyTasks");
    },
  });

  const handleUpdate = async () => {
    const res = await mutateAsync({
      id: task.id,
      title: taskTitle,
      status: taskStatus,
    });

    if (res.updateTask.title) {
      onClose();
    }
  };

  return (
    <>
      <Icon mr="2" cursor="pointer" as={FiEdit} onClick={() => onOpen()} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task: {taskTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />

              <Select
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option>active</option>
                <option>archived</option>
                <option>completed</option>
              </Select>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpdate}
              isLoading={isLoading}
            >
              Update
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
