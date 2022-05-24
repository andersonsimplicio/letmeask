import { FormEvent, useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { singIn } from '../../services/apiLogin';
import { authContext } from '../../context/AuthContext';


export default function Modal() {
  const { getUser } = useContext(authContext);
  const [open, setOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleClickOpen = (e: FormEvent) => {
    e.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);


  };
  const handleSignIn = async () => {
    setOpen(false);
    let token  =  await singIn(username, password);
    if (token !== undefined && token !== '') {
      getUser();
      window.location.reload()
    }

  };
  return (
    <>

      <button onClick={event => handleClickOpen(event)}>faça seu login</button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            variant="standard"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancelar</Button>
          <Button type="submit" onClick={handleSignIn}>entra</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}