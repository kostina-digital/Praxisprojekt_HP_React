import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

export default function CategoryCardProfileMenu({ data }) {
  return (
    <Card
      sx={{
        width: '15%',
        margin: '1%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flex: '1 0 15%',
      }}
    >
      <CardActionArea 
        component={Link} 
        to={data.link || '#'}
        sx={{ height: '100%', textDecoration: 'none' }}
      >
        <CardMedia
          component="img"
          image={data.image}
          alt={data.name}
          sx={{
            width: '100%',
            height: '20vh',
            objectFit: 'cover'
          }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-center', justifyContent: 'flex-center'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: 'text.primary', textAlign: 'center' }}>
            {data.name || 'Unknown'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
