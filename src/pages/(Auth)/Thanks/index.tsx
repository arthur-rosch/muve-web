import { Check } from '@phosphor-icons/react';
import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';

export const Thanks = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#121212] text-white space-y-4">
            <Check size={80} color='#187BF0'/>
            
        
            <h1 className="text-2xl font-semibold">Obrigado pela sua assinatura!</h1>
            <p className="text-lg">Estamos felizes em tê-lo conosco.</p>
            
            <Button
                type="submit"
                variant="primary"
                className="w-[20%] h-12 mt-4"
                onClick={() => navigate("/login")}
              >
                Fazer Login
            </Button>
        </div>
    );
};
