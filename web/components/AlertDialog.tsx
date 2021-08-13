import {
  Icon,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useQueryClient } from "react-query";
import { useDeleteTaskMutation } from "../src/generated";
import { FiDelete } from "react-icons/fi";

export function AlertDialogEx({ task }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useDeleteTaskMutation({
    onSuccess: () => {
      queryClient.invalidateQueries("getMyTasks");
    },
  });

  const handleDelete = async () => {
    const res = await mutateAsync({ id: task.id });
    if (res.deleteTask) {
      onClose();
    }
  };

  return (
    <>
      <Icon cursor="pointer" as={FiDelete} onClick={() => setIsOpen(true)} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task: {task.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
