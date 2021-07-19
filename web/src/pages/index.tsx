import { TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Flare } from '@material-ui/icons';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useRegisterMutation } from '../generated';

function home() {
  const queryClient = useQueryClient();
  const { mutate } = useRegisterMutation({});

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form style={{ width: '25%', marginTop: '20px' }}>
        <TextField
          required
          label="username"
          id="username"
          fullWidth
          margin="dense"
          helperText="username must be unique"
        />

        <TextField required label="email" id="email" fullWidth margin="dense" />

        <TextField
          required
          label="password"
          id="password"
          fullWidth
          margin="dense"
          helperText="password must be atleast 6 character long"
        />
      </form>
    </div>
  );
}

export default home;
