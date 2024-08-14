import { TextField,CardActions, CardContent,CardMedia, CardHeader, Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

interface IProps {
    onSaveClick: () => void
}

const EditPost = (props:IProps) => {

    const {onSaveClick} = props;

    return (
        <Card sx={{ width: '30rem', backgroundColor:'#fff', padding:'1rem' }}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe">
            </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        />
        <CardMedia/>
        <CardContent>
            <TextField
                id="outlined-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
                rows={4}
            />
        </CardContent>
        <CardActions> 
            <IconButton aria-label="save" onClick={onSaveClick}>
                <SaveIcon />
            </IconButton>
        </CardActions>
        </Card>
    );
}

export default EditPost;