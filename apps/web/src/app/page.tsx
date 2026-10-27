import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material';

const milestones = [
  { title: 'Asset lifecycle', status: 'Stage 1', description: 'Create, inspect, and transfer demo assets.' },
  { title: 'Trading and DvP', status: 'Planned', description: 'Settle asset and payment legs atomically.' },
  { title: 'Activity timeline', status: 'Planned', description: 'Translate ledger updates into business events.' },
  { title: 'Privacy explorer', status: 'Planned', description: 'Test and explain party-level visibility.' },
];

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box component="main" sx={{ py: 8 }}>
        <Typography variant="overline" color="primary">Canton / Daml portfolio project</Typography>
        <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 2, fontWeight: 700 }}>
          AssetFlow
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760, mb: 5 }}>
          A learning project for tokenized assets, atomic settlement, ledger monitoring, and privacy boundaries.
        </Typography>
        <Grid container spacing={2}>
          {milestones.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Chip label={item.status} size="small" color={item.status === 'Stage 1' ? 'primary' : 'default'} />
                  <Typography variant="h5" component="h2" sx={{ mt: 2, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
