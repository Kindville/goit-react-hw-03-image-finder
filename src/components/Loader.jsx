import { TailSpin } from 'react-loader-spinner'
import './styles.css'

export const Loader = () => {
  return (
    <div className="Loader">
      <TailSpin
           color="#9c8de1"
            height={80}
            width={80}
            ariaLabel='loading'/>
    </div>
  );
}