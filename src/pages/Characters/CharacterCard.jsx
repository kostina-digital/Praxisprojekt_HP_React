import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import placeholderImg from '../../assets/images/placeholder.webp';

export default function CharacterCard({ character }) {
  return (
    <Card
      sx={{
        width: 250,
        m: 1,
        flex: '0 0 0 23%',
        boxSizing: 'border-box'
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={character.image && character.image.trim() ? character.image : placeholderImg}
          alt={character.name}
          sx={{
            width: '100%',
            height: 300,
            objectFit: 'cover'
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name || 'Unknown'}
          </Typography>
          {character.house && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {character.house}
            </Typography>
          )}
          {character.patronus && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Patronus: {character.patronus || 'Unknown'}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
