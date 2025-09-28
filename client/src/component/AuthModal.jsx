import React from 'react'
import { Modal, Typography, Button, Box } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = ({ isOpen, onSuccess, onClose }) => {
    const [isLogin, setIsLogin] = React.useState(true);
    
    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };
    
    const handleAuthSuccess = (userData) => {
        onSuccess(userData); // Notify parent component
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                maxHeight: '40vw',
                overflowY: 'auto',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Typography variant="h6" component="h2" gutterBottom align="center">
                    {isLogin ? 'Login to Continue' : 'Create an Account'}
                </Typography>
                
                {isLogin ? (
                    <LoginForm 
                        onSuccess={handleAuthSuccess} 
                        onSwitchToSignup={handleSwitch}
                    />
                ) : (
                    <SignupForm 
                        onSuccess={handleAuthSuccess} 
                        onSwitchToLogin={() => setIsLogin(true)}
                    />
                )}
                
                <Box textAlign="center" mt={2}>
                    <Button onClick={onClose} variant="outlined" size="small">
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AuthModal;