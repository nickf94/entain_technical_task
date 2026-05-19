import { useState } from 'react'
import {
  Container,
  Paper,
  Button,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Material UI + Vite + React + TypeScript
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Material UI
          </Typography>
          <Typography component="" variant="body1" color="text.secondary" paragraph>
            This is a modern React app built with Material UI, Vite, and TypeScript.
          </Typography>

          <Box sx={{ my: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Counter: {count}
                </Typography>
                <TextField
                  fullWidth
                  label="Enter text"
                  variant="outlined"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setCount(count + 1)}
                >
                  Increment
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setCount(0)}
                >
                  Reset
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              ✨ Edit <code>src/App.tsx</code> to get started
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default App
