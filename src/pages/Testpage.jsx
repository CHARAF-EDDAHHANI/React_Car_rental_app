      import React from 'react';
import { Box, Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


const Testpage = () => {
  return (
    <Box position="relative" display="inline-block">
      <Box
        sx={{
          position: 'absolute',
          top: '18%',
          left: '150%',
          transform: 'translateX(-50%)',
          bgcolor: 'grey.600',
          color: 'white',
          px: 1.1,
          py: 0.5,
          borderRadius: 1,
          fontSize: 12,
          whiteSpace: 'nowrap',
          display: 'none',
          zIndex: 10,
        }}
        className="hover-label"
      >
        Button Label
      </Box>

      <Button
        onMouseEnter={(e) =>
          e.currentTarget.previousSibling.style.display = 'block'
        }
        onMouseLeave={(e) =>
          e.currentTarget.previousSibling.style.display = 'none'
        }
      >
        <InfoIcon />
      </Button>
    </Box>
  );
};

export default Testpage;