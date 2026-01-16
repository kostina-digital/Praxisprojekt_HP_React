import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import signInMenuIcon1 from '../../../assets/images/signInMenuIcon1.png';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: <b>Personalized space</b>,
    description:
      'Access your personal dashboard where everything is tailored to you — from saved content to your activity across the platform. Your account brings everything together in one place.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: <b> Community & discussions</b>,
    description:
      'Join the forum to exchange ideas, share opinions, and connect with other users who share your interests. Communicate, discuss, and grow together.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: <b> Your personal blog </b>,
    description:
      'Create and explore blog content at your own pace — read, write, and engage with posts that matter to you. Your thoughts. Your voice. Your space.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: <b> Favorites & saved content</b>,
    description:
      'Like content across the site and easily find it later in your personal collection.Your favorites, always within reach.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src={signInMenuIcon1} alt="signInMenuIcon1" />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
