import { ModalProvider } from './context/modal/ModalContext';
import AppRoutes from './routes/AppRoutes';



export default function App() {
  return (
    <div className='root-container'>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </div>
  );
}