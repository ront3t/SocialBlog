import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Latest Articles" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
