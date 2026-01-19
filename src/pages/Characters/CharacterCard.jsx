import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import placeholderImg from '../../assets/images/placeholder.webp';

export default function CharacterCard({ character }) {
  // Check if character exists
  if (!character) {
    return null
  }
  
  return (
    <Card
      sx={{
        width: '23%',
        minWidth: 220,
        maxWidth: 330,
        margin: '1%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flex: '1 0 21%', // makes 4 in a row with gap
      }}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={character.image && character.image.trim() ? character.image : placeholderImg}
          alt={character.name}
          sx={{
            width: '100%',
            height: '30vh',
            objectFit: 'cover'
          }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Typography gutterBottom variant="h5" component="div">
            {character.name || 'Unknown'}
          </Typography>
          {character.house && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             <b>House: </b> {character.house || 'Unknown'}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <b>Patronus: </b> {character.patronus && character.patronus.trim() ? character.patronus : 'Unknown'}
          </Typography>
          {character.wand && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', width: '100%', pl: 0, textAlign: 'left' }}
            >
              <b>Wand: </b>
              {character.wand.wood || 'Unknown'} wood, {character.wand.core || 'Unknown'} core, {character.wand.length || 'Unknown'} length
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
