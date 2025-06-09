// src/components/CustomArrow.tsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#fff',
        width: 50,
        height: 50,
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#fff',
        width: 50,
        height: 50,
        '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
