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
import { Link, useNavigate, useParams } from 'react-router-dom';
// import TaskDialog from '../components/Task/CreateUpdate';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Home from './Home';

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
    // segment: 'dashboard',
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
  const id=  localStorage.getItem("id");
  const { window } = props;
  const navigate = useNavigate(); // Hook to navigate programmatically
  const userId=useParams()

  const router = useDemoRouter('/dashboard');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [task, setTask] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleTaskClick = () => {
    setTask(null);
    setOpenDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const demoWindow = typeof window === 'function' ? window() : undefined;

  useEffect(() => {
    // Placeholder for any potential side-effects
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0,0,0,0.8)', boxShadow: 'none' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" onClick={() => setOpenDrawer(true)} sx={{ display: { xs: 'block', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              TaskApp
            </Typography>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" component={Link} to="/board">
                Task
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar
                src="/broken-image.jpg"
                onClick={() => {
                 // Replace with actual user ID logic
                  navigate(`/profile/${id}`);
                }}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          variant="temporary"
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
            },
          }}
        >
          <List>
            {NAVIGATION.map((item) => (
              item.kind !== 'divider' ? (
                <ListItem button key={item.segment} component={Link} to={`/${item.segment}`}>
                  <ListItemText primary={item.title} />
                </ListItem>
              ) : (
                <hr key={item.title} />
              )
            ))}
          </List>
        </Drawer>

        <PageContainer>
          {/* Add content here */}
          <Home/>
        </PageContainer>
      </DashboardLayout>

      {/* <TaskDialog
        open={openDialog}
        onClose={handleCloseDialog}
        task={task}
      /> */}
    </AppProvider>
  );
}
