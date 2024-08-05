import { Container, Grid } from '@mui/material';
import PostList from '../PostsList/PostList';

const PostContaier = () => {
  return (
    <div className="app">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <PostList />
          </Grid>
          {/* <Grid item xs={3}>
            <Widgets />
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default PostContaier;
