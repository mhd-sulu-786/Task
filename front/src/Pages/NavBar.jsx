import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import TaskDialog from '../components/Task/Update';
import { useEffect } from 'react';


const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'tasks',
    title: 'Tasks',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function Dashboard(props: any) {
  const { window } = props;
  const navigate = useNavigate(); // Hook to navigate programmatically

  const router = useDemoRouter('/dashboard');
  const [openDialog, setOpenDialog] = React.useState(false); // Manage Dialog State
  const [task, setTask] = React.useState(null);  // To hold selected task data

  const handleTaskClick = () => {
    setTask(null);  // Reset task state when creating a new task
    setOpenDialog(true); // Open the dialog when 'Task' button is clicked
  };

  const handleLogout = () => {
    // Clear session storage or authentication tokens
    localStorage.removeItem('authToken');  // Example for token removal
    sessionStorage.clear();  // Clear session if any

    // Redirect to the login page (or home)
    navigate('/login');  // Assuming you have a '/login' route for the login page
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  // Corrected: Check window type properly
  const demoWindow = typeof window === 'function' ? window() : undefined;

  useEffect(()=>{

  })

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {/* Navbar inside Toolpad layout */}
        <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0,0,0,0.6)', boxShadow: 'none' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
           

            {/* Toolpad logo or text in the center */}
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              TaskApp
            </Typography>

            {/* Right side: Home and About buttons */}
            <div>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" onClick={handleTaskClick}>
              Task
            </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <PageContainer>
          
        </PageContainer>
      </DashboardLayout>

      {/* Task Dialog */}
      <TaskDialog
        open={openDialog}
        onClose={handleCloseDialog}
        task={task} // Pass the task data (null for new task or the task to edit)
      />
    </AppProvider>
  );
}
