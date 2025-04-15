import { Box } from "@mui/material";


const ShimmerEffect: React.FC<{ hieght: number,count:number }> = ({ hieght,count }) => {
    return <Box sx={{ mt: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {[...Array(count)].map((_, index) => (
        <Box
          key={index}
          sx={{
            height: hieght,
            backgroundColor: '#e0e0e0',
            borderRadius: 4,
            animation: 'shimmer 1.5s infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200px 0' },
              '100%': { backgroundPosition: '200px 0' },
            },
            background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
            backgroundSize: '600px 100%',
          }}
        />
      ))}
    </Box>
  </Box>
}

export default ShimmerEffect;