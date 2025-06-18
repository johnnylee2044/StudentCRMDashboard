import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './404Page.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById('waveCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };

    window.addEventListener('resize', resize);
    resize();

    const wave = {
      y: canvas.height / 2,
      length: 0.01,
      amplitude: 70,
      frequency: 0.01
    };

    const animate = () => {
      time += 0.05;
      ctx.fillStyle = '#f0f9ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(
          i,
          wave.y +
            Math.sin(i * wave.length + time) *
              wave.amplitude * Math.sin(time * wave.frequency)
        );
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = '#0369a1';
      ctx.fill();
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="nature-404-container">
      <canvas id="waveCanvas" className="wave-canvas" />

      <div className="floating-cloud">
        <svg viewBox="0 0 120 60">
          <path d="M20,30 Q30,20 40,30 Q50,40 60,30 Q70,20 80,30 Q90,40 100,30" />
        </svg>
      </div>

      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Lost in the Forest</h2>
        
        <div className="mountain-decoration">
          <svg className="mountain-path" viewBox="0 0 200 80">
            <path d="M20,60 Q40,30 60,60 Q80,20 100,60 Q120,10 140,60 Q160,40 180,60" />
            <circle cx="40" cy="30" r="8" />
            <circle cx="80" cy="20" r="6" />
            <circle cx="120" cy="10" r="5" />
          </svg>
        </div>

        <p className="error-description">
          The page you're looking for has wandered off like a leaf in the wind. 
          Maybe it's floating down a stream or nesting with the birds.
        </p>

        <button
          onClick={() => navigate('/')}
          className="home-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Return to Safety
        </button>
      </div>

      <div className="bottom-wave">
        <svg viewBox="0 0 1200 120">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      <div className="floating-leaf">
        <svg viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.115l-1.78 1.77C3.5 16.99 3 15.49 3 14c0-3.866 4.03-7 9-7s9 3.134 9 7c0 1.49-.5 2.99-1.11 4l-1.78-1.77C19.48 14.935 21 12.672 21 10.115 21 6.185 16.97 3 12 3z" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;