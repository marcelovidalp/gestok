import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import Register from './pages/Register'
import Reports from './pages/Reports'
import Costs from './pages/Costs'
import Recipes from './pages/Recipes'
import Help from './pages/Help'
import { useMaterialTheme } from './utils/muiTheme'

function App() {
  const theme = useMaterialTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App